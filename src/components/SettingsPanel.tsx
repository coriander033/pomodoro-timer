import { useRef, useState, useEffect, useCallback } from 'react'
import type { Settings } from '../types'

interface SettingsPanelProps {
  open: boolean
  settings: Settings
  onUpdate: (key: keyof Settings, value: number) => void
  onClose: () => void
}

interface SliderFieldProps {
  label: string
  value: number
  min: number
  max: number
  unit: string
  accentColor: string
  onChange: (value: number) => void
}

function SliderField({ label, value, min, max, unit, accentColor, onChange }: SliderFieldProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)

  const pct = ((value - min) / (max - min)) * 100

  const setValueFromPosition = useCallback(
    (clientX: number) => {
      const track = trackRef.current
      if (!track) return
      const rect = track.getBoundingClientRect()
      const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
      onChange(Math.round(min + ratio * (max - min)))
    },
    [min, max, onChange],
  )

  useEffect(() => {
    if (!dragging) return

    const handleMove = (e: MouseEvent) => setValueFromPosition(e.clientX)
    const handleUp = () => setDragging(false)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [dragging, setValueFromPosition])

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted">{label}</span>
        <span className="font-mono text-sm font-medium text-foreground">
          {value}
          <span className="ml-0.5 text-xs text-muted">{unit}</span>
        </span>
      </div>

      {/* Custom slider track */}
      <div
        ref={trackRef}
        className="relative h-2 cursor-pointer rounded-full bg-background"
        onMouseDown={(e) => {
          setDragging(true)
          setValueFromPosition(e.clientX)
        }}
      >
        {/* Filled portion */}
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-75"
          style={{ width: `${pct}%`, backgroundColor: accentColor }}
        />
        {/* Thumb */}
        <div
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full
            border-2 border-white shadow-md transition-transform duration-75"
          style={{
            left: `${pct}%`,
            backgroundColor: accentColor,
            ...(dragging ? { transform: 'translate(-50%, -50%) scale(1.2)' } : {}),
          }}
        />
      </div>
    </div>
  )
}

const FIELDS: { key: keyof Settings; label: string; min: number; max: number; unit: string }[] = [
  { key: 'focus', label: '专注时长', min: 1, max: 120, unit: '分钟' },
  { key: 'shortBreak', label: '短休息', min: 1, max: 20, unit: '分钟' },
  { key: 'longBreak', label: '长休息', min: 1, max: 60, unit: '分钟' },
  { key: 'longBreakInterval', label: '长休息间隔', min: 1, max: 8, unit: '个番茄' },
]

export function SettingsPanel({ open, settings, onUpdate, onClose }: SettingsPanelProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm animate-[slideUp_0.25s_ease-out] rounded-2xl bg-surface p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">设置</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full
              text-muted transition-colors hover:bg-background hover:text-foreground"
            aria-label="关闭"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Slider fields */}
        <div className="space-y-5">
          {FIELDS.map(({ key, label, min, max, unit }) => (
            <SliderField
              key={key}
              label={label}
              value={settings[key]}
              min={min}
              max={max}
              unit={unit}
              accentColor="#E85D4A"
              onChange={(v) => onUpdate(key, v)}
            />
          ))}
        </div>

        {/* Footer hint */}
        <p className="mt-6 text-center text-xs text-muted">
          设置自动保存
        </p>
      </div>
    </div>
  )
}
