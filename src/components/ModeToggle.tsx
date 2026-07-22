import type { TimerMode } from '../types'

interface ModeToggleProps {
  mode: TimerMode
  onChange: (mode: TimerMode) => void
}

const MODE_LABELS: Record<TimerMode, string> = {
  focus: '专注',
  shortBreak: '短休息',
  longBreak: '长休息',
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  const modes: TimerMode[] = ['focus', 'shortBreak', 'longBreak']

  return (
    <div className="flex gap-1 rounded-full bg-surface p-1">
      {modes.map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors
            ${mode === m
              ? 'bg-tomato text-white'
              : 'text-muted hover:text-foreground'
            }`}
        >
          {MODE_LABELS[m]}
        </button>
      ))}
    </div>
  )
}
