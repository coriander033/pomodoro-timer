import type { TimerMode } from '../types'

interface BreakReminderProps {
  show: boolean
  mode: TimerMode
  onConfirm: () => void
}

const MESSAGES: Record<TimerMode, { title: string; subtitle: string; action: string }> = {
  focus: { title: '专注完成', subtitle: '休息一下吧', action: '开始休息' },
  shortBreak: { title: '短休息结束', subtitle: '准备下一个番茄', action: '开始专注' },
  longBreak: { title: '长休息结束', subtitle: '精力充沛，继续加油', action: '开始专注' },
}

/** A ripe tomato with stem and leaves — for focus-complete */
function TomatoIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="drop-shadow-[0_0_16px_rgba(232,93,74,0.45)]">
      <defs>
        <radialGradient id="tomatoBody" cx="38%" cy="32%" r="62%">
          <stop offset="0%" stopColor="#F27D6C" />
          <stop offset="70%" stopColor="#E85D4A" />
          <stop offset="100%" stopColor="#C94A3A" />
        </radialGradient>
      </defs>

      {/* Stem */}
      <path
        d="M36 18 L36 10"
        stroke="#5E8A6E"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Left leaf */}
      <path
        d="M36 14 C30 10 24 14 22 18 C28 16 34 16 36 14"
        fill="#7BA68C"
      />
      {/* Right leaf */}
      <path
        d="M36 12 C42 8 48 12 50 16 C44 14 38 14 36 12"
        fill="#9DC4AE"
      />
      {/* Small center leaf */}
      <path
        d="M36 11 C34 7 38 5 40 8 C38 9 36 10 36 11"
        fill="#5E8A6E"
        opacity="0.6"
      />

      {/* Tomato body */}
      <ellipse cx="36" cy="44" rx="24" ry="22" fill="url(#tomatoBody)" />

      {/* Lobes / contour lines */}
      <path
        d="M36 22 C30 30 28 40 30 50 C32 56 34 58 36 60"
        fill="none"
        stroke="#C94A3A"
        strokeWidth="0.8"
        opacity="0.4"
      />
      <path
        d="M36 22 C42 30 44 40 42 50 C40 56 38 58 36 60"
        fill="none"
        stroke="#C94A3A"
        strokeWidth="0.8"
        opacity="0.4"
      />

      {/* Highlight */}
      <ellipse cx="28" cy="36" rx="6" ry="9" fill="white" opacity="0.12" />
      <ellipse cx="44" cy="48" rx="3" ry="5" fill="white" opacity="0.06" />
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
