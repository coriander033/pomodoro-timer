import type { TimerMode } from '../types'

interface BreakReminderProps {
  show: boolean
  mode: TimerMode
  onConfirm: () => void
}

const MESSAGES: Record<TimerMode, { title: string; subtitle: string; action: string }> = {
  focus: { title: '专注完成！', subtitle: '休息一下吧', action: '开始休息' },
  shortBreak: { title: '短休息结束', subtitle: '准备下一个番茄', action: '开始专注' },
  longBreak: { title: '长休息结束', subtitle: '精力充沛，继续加油', action: '开始专注' },
}

/** A ripe tomato with a subtle glow — for focus-complete */
function TomatoIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="drop-shadow-[0_0_12px_rgba(232,93,74,0.4)]">
      <defs>
        <radialGradient id="tomatoGlow" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#F27D6C" />
          <stop offset="100%" stopColor="#E85D4A" />
        </radialGradient>
      </defs>
      <path
        d="M32 8C24 8 18 14 18 22c0 2 0 4 2 6l12 12 12-12c2-2 2-4 2-6 0-8-6-14-14-14"
        fill="url(#tomatoGlow)"
      />
      <path
        d="M32 22c-2-2-4-4-6-6"
        fill="none"
        stroke="#5E8A6E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M32 14c-2-2 0-6 0-4 2-2 4 2 0 4"
        fill="#7BA68C"
      />
      {/* Highlight */}
      <ellipse cx="26" cy="18" rx="4" ry="6" fill="white" opacity="0.15" />
    </svg>
  )
}

/** A sprouting seedling — for break-complete (back to focus) */
function SproutIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="drop-shadow-[0_0_12px_rgba(123,166,140,0.4)]">
      <defs>
        <linearGradient id="sproutGrad" x1="32" y1="12" x2="32" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9DC4AE" />
          <stop offset="100%" stopColor="#5E8A6E" />
        </linearGradient>
      </defs>
      {/* Stem */}
      <path
        d="M32 56 V28"
        stroke="url(#sproutGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Left leaf */}
      <path
        d="M32 32 C24 28 18 32 16 38 C22 36 28 36 32 32"
        fill="#7BA68C"
      />
      {/* Right leaf */}
      <path
        d="M32 24 C40 20 46 24 48 30 C42 28 36 28 32 24"
        fill="#9DC4AE"
      />
      {/* New sprout tip */}
      <path
        d="M32 28 C28 22 24 18 26 14 C30 16 32 22 32 28"
        fill="#5E8A6E"
        opacity="0.7"
      />
    </svg>
  )
}

export function BreakReminder({ show, mode, onConfirm }: BreakReminderProps) {
  if (!show) return null

  const { title, subtitle, action } = MESSAGES[mode]
  const isBreak = mode !== 'focus'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onConfirm}
    >
      <div
        className="mx-4 w-full max-w-xs rounded-2xl p-8 text-center shadow-2xl"
        style={{
          backgroundColor: isBreak ? '#2A3D32' : '#3D2A2A',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="mb-5 flex justify-center">
          {isBreak ? <SproutIcon /> : <TomatoIcon />}
        </div>

        <h2 className="mb-2 text-2xl font-bold text-foreground">{title}</h2>
        <p className="mb-6 text-muted">{subtitle}</p>
        <button
          onClick={onConfirm}
          className={`w-full rounded-lg py-3 text-sm font-medium text-white transition-colors
            ${isBreak ? 'bg-sage hover:bg-sage-dark' : 'bg-tomato hover:bg-tomato-dark'}`}
        >
          {action}
        </button>
      </div>
    </div>
  )
}
