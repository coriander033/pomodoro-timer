import type { TimerMode } from '../types'

interface TomatoBackgroundProps {
  mode: TimerMode
  completed: number
  target: number
}

/**
 * The tomato grows continuously based on completed/target ratio.
 * Works for any target value (1-8).
 *
 * Every property (size, color, glow) is a continuous function of progress.
 */
export function TomatoBackground({ mode, completed, target }: TomatoBackgroundProps) {
  const progress = target > 0 ? completed / target : 0
  const isResting = mode !== 'focus'

  const bodyColor = interpolateColor('#5E8A6E', '#E85D4A', progress)
  const scale = 0.3 + progress * 0.7
  const glowOpacity = 0.08 + progress * (isResting ? 0.22 : 0.15)

  return (
    <div className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute h-[800px] w-[800px] rounded-full blur-[120px] transition-all duration-1000"
        style={{
          backgroundColor: bodyColor,
          opacity: glowOpacity,
        }}
      />

      {/* Tomato SVG */}
      <svg
        className="h-[560px] w-[560px] transition-all duration-1000 ease-out"
        viewBox="0 0 200 200"
        style={{
          opacity: 0.25 + progress * 0.25,
          transform: `scale(${scale}) ${isResting ? 'rotate(-2deg)' : ''}`,
        }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="bgTomatoGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor={bodyColor} stopOpacity="1" />
            <stop offset="100%" stopColor={bodyColor} stopOpacity="0.4" />
          </radialGradient>
        </defs>

        {/* Stem + leaf — fades in after first tomato */}
        <g opacity={Math.min(progress * 2.5, 1)}>
          <path
            d="M100 55 C96 45 100 38 100 42 C102 38 104 45 100 55"
            fill="#5E8A6E"
          />
          <path
            d="M100 55 C97 50 99 46 100 48"
            fill="#9DC4AE"
            opacity="0.7"
          />
        </g>

        {/* Body — always visible after progress > 0, grows with progress */}
        <ellipse
          cx="100"
          cy="115"
          rx={12 + progress * 60}
          ry={10 + progress * 56}
          fill="url(#bgTomatoGrad)"
        />

        {/* Highlight sheen */}
        <ellipse
          cx={90 - progress * 6}
          cy={106 - progress * 8}
          rx={5 + progress * 12}
          ry={6 + progress * 14}
          fill="white"
          opacity={0.06 + progress * 0.06}
        />
      </svg>
    </div>
  )
}

/** Linear interpolation between two hex colors */
function interpolateColor(a: string, b: string, t: number): string {
  const ah = parseInt(a.slice(1), 16)
  const bh = parseInt(b.slice(1), 16)
  const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff
  const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff
  const rr = Math.round(ar + (br - ar) * t)
  const rg = Math.round(ag + (bg - ag) * t)
  const rb = Math.round(ab + (bb - ab) * t)
  return `#${((rr << 16) | (rg << 8) | rb).toString(16).padStart(6, '0')}`
}
