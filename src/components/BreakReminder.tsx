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

/** A sprouting seedling — for short-break-complete (back to focus) */
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

/** Rich soil bed with a sprouting seed — for long-break-complete */
function SoilIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="drop-shadow-[0_0_16px_rgba(120,95,65,0.45)]">
      <defs>
        <linearGradient id="soilTop" x1="36" y1="24" x2="36" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7A6248" />
          <stop offset="100%" stopColor="#5C4A35" />
        </linearGradient>
        <linearGradient id="soilBase" x1="36" y1="40" x2="36" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5C4A35" />
          <stop offset="100%" stopColor="#3D3225" />
        </linearGradient>
        <radialGradient id="seedGrad" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#B8D8C0" />
          <stop offset="60%" stopColor="#7BA68C" />
          <stop offset="100%" stopColor="#5E8A6E" />
        </radialGradient>
        <linearGradient id="sproutGrad" x1="36" y1="22" x2="36" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9DC4AE" />
          <stop offset="100%" stopColor="#5E8A6E" />
        </linearGradient>
      </defs>

      {/* Ground / earth base */}
      <path
        d="M6 48 C6 40 12 32 20 28 C26 25 30 24 36 24 C42 24 46 25 52 28 C60 32 66 40 66 48 C66 54 60 60 36 60 C12 60 6 54 6 48Z"
        fill="url(#soilBase)"
      />

      {/* Soil surface — raised bed */}
      <path
        d="M10 44 C10 36 16 30 24 27 C29 25 33 24 36 24 C39 24 43 25 48 27 C56 30 62 36 62 44 C62 48 58 52 36 52 C14 52 10 48 10 44Z"
        fill="url(#soilTop)"
      />

      {/* Furrow lines — rows in the soil */}
      <path d="M14 40 C22 38 30 40 38 39 C46 38 54 40 58 39" fill="none" stroke="#4A3D2C" strokeWidth="0.7" opacity="0.4" strokeLinecap="round" />
      <path d="M12 44 C20 42 28 44 36 43 C44 42 52 44 60 43" fill="none" stroke="#4A3D2C" strokeWidth="0.7" opacity="0.35" strokeLinecap="round" />
      <path d="M16 48 C24 46 32 48 40 47 C48 46 56 48 60 47" fill="none" stroke="#4A3D2C" strokeWidth="0.6" opacity="0.3" strokeLinecap="round" />

      {/* Soil texture dots */}
      <circle cx="18" cy="46" r="0.8" fill="#4A3D2C" opacity="0.3" />
      <circle cx="26" cy="43" r="0.6" fill="#4A3D2C" opacity="0.25" />
      <circle cx="44" cy="45" r="0.7" fill="#4A3D2C" opacity="0.3" />
      <circle cx="52" cy="42" r="0.5" fill="#4A3D2C" opacity="0.2" />
      <circle cx="34" cy="47" r="0.6" fill="#4A3D2C" opacity="0.25" />
      <circle cx="48" cy="47" r="0.8" fill="#4A3D2C" opacity="0.2" />

      {/* Seed — nestled in soil */}
      <ellipse cx="36" cy="40" rx="4" ry="5" fill="url(#seedGrad)" />
      <ellipse cx="34.5" cy="38.5" rx="1.5" ry="2" fill="white" opacity="0.15" />

      {/* Sprout emerging from seed */}
      <path
        d="M36 36 C36 30 36 26 36 22"
        stroke="url(#sproutGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Sprout leaves */}
      <path
        d="M36 26 C32 23 28 25 28 28 C31 27 34 26 36 26"
        fill="#7BA68C"
      />
      <path
        d="M36 24 C40 21 44 23 44 26 C41 25 38 24 36 24"
        fill="#9DC4AE"
      />
      {/* Tiny new leaf at tip */}
      <path
        d="M36 23 C34 19 37 17 39 19 C38 20 37 22 36 23"
        fill="#B8D8C0"
        opacity="0.7"
      />

      {/* Highlight on soil surface */}
      <ellipse cx="26" cy="34" rx="6" ry="2" fill="white" opacity="0.05" />
    </svg>
  )
}

export function BreakReminder({ show, mode, onConfirm }: BreakReminderProps) {
  if (!show) return null

  const { title, subtitle, action } = MESSAGES[mode]
  const isBreak = mode !== 'focus'
  const isLongBreak = mode === 'longBreak'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onConfirm}
    >
      <div
        className="mx-4 w-full max-w-xs rounded-2xl p-8 text-center shadow-2xl"
        style={{
          backgroundColor: isLongBreak ? '#3D3528' : isBreak ? '#2A3D32' : '#3D2A2A',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="mb-5 flex justify-center">
          {isLongBreak ? <SoilIcon /> : isBreak ? <SproutIcon /> : <TomatoIcon />}
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
