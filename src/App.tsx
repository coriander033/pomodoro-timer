import { useState, useCallback, useEffect, useRef } from 'react'
import type { TimerMode } from './types'
import { useTimer } from './hooks/useTimer'
import { useSettings } from './hooks/useSettings'
import { playChime } from './utils/sound'
import { TomatoBackground } from './components/TomatoBackground'
import { TimerRing } from './components/TimerRing'
import { TimerDisplay } from './components/TimerDisplay'
import { Controls } from './components/Controls'
import { ModeToggle } from './components/ModeToggle'
import { TomatoCounter } from './components/TomatoCounter'
import { SettingsPanel } from './components/SettingsPanel'
import { BreakReminder } from './components/BreakReminder'

export default function App() {
  const { settings, updateSetting } = useSettings()
  const [mode, setMode] = useState<TimerMode>('focus')
  const [completed, setCompleted] = useState(0)
  const [showReminder, setShowReminder] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const autoStartRef = useRef(false) // true → next reset should auto-start

  const totalSeconds = settings[mode] * 60

  const handleComplete = useCallback(() => {
    playChime(mode === 'focus' ? 'complete' : 'break-end')
    setShowReminder(true)

    if (mode === 'focus') {
      setCompleted((c) => c + 1)
    }

    document.title = '番茄钟 — 完成！'
  }, [mode])

  const { secondsLeft, progress, status, start, pause, reset } = useTimer({
    initialSeconds: totalSeconds,
    onComplete: handleComplete,
  })

  // Keep a ref to start() so we can call it from effects without
  // adding it to dependency arrays (which would cause reset loops).
  const startRef = useRef(start)
  useEffect(() => { startRef.current = start }, [start])

  // Reset timer when mode changes — auto-start if flagged
  useEffect(() => {
    reset()
    if (autoStartRef.current) {
      autoStartRef.current = false
      setTimeout(() => startRef.current(), 50)
    }
  }, [mode, totalSeconds, reset])

  // Update document title with remaining time
  useEffect(() => {
    if (status !== 'idle') {
      const mins = Math.floor(secondsLeft / 60)
      const secs = secondsLeft % 60
      document.title = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')} — 番茄钟`
    } else {
      document.title = '番茄钟'
    }
  }, [secondsLeft, status])

  // Keyboard: Space = start/pause, R = reset
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if ((e.target as HTMLElement).tagName === 'INPUT') return
      // Ignore if modals are open
      if (showReminder || settingsOpen) return

      if (e.code === 'Space') {
        e.preventDefault()
        if (status === 'running') pause()
        else start()
      }
      if (e.code === 'KeyR') {
        e.preventDefault()
        reset()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [status, start, pause, reset, showReminder, settingsOpen])

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode)
  }

  const handleDismissReminder = () => {
    setShowReminder(false)
    autoStartRef.current = true // auto-start after mode switch
    if (mode === 'focus') {
      const nextMode =
        completed % settings.longBreakInterval === 0 ? 'longBreak' : 'shortBreak'
      setMode(nextMode)
    } else {
      // After any break → back to focus. Reset counter if we just finished a long break.
      if (mode === 'longBreak') {
        setCompleted(0)
      }
      setMode('focus')
    }
  }

  const ringColor = mode === 'focus' ? '#E85D4A' : '#7BA68C'

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 font-sans">
      {/* Large tomato background */}
      <TomatoBackground mode={mode} completed={completed} target={settings.longBreakInterval} />

      {/* Settings button */}
      <button
        onClick={() => setSettingsOpen(true)}
        className="absolute right-5 top-5 z-10 text-muted transition-colors hover:text-foreground"
        aria-label="设置"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {/* Mode toggle */}
      <div className="relative z-10 mb-10">
        <ModeToggle mode={mode} onChange={handleModeChange} />
      </div>

      {/* Timer ring + display */}
      <div className="relative z-10 mb-10 flex items-center justify-center">
        <TimerRing progress={progress} color={ringColor} size={280} />
        <div className="absolute flex flex-col items-center">
          <TimerDisplay secondsLeft={secondsLeft} />
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-10 mb-8">
        <Controls
          status={status}
          onStart={start}
          onPause={pause}
          onReset={reset}
        />
      </div>

      {/* Tomato counter */}
      <div className="relative z-10">
        <TomatoCounter
          completed={completed}
          target={settings.longBreakInterval}
          onReset={() => setCompleted(0)}
        />
      </div>

      {/* Modals */}
      <BreakReminder
        show={showReminder}
        mode={mode}
        onConfirm={handleDismissReminder}
      />
      <SettingsPanel
        open={settingsOpen}
        settings={settings}
        onUpdate={updateSetting}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  )
}
