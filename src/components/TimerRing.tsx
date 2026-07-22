import { useEffect, useState } from 'react'

interface TimerRingProps {
  progress: number // 0 to 1
  size?: number      // default / mobile size
  mdSize?: number    // desktop size (>= 640px)
  strokeWidth?: number
  color: string
}

function useBreakpoint(breakpoint: number): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= breakpoint : false,
  )
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    setMatches(mq.matches)
    return () => mq.removeEventListener('change', handler)
  }, [breakpoint])
  return matches
}

export function TimerRing({
  progress,
  size = 220,
  mdSize = 280,
  strokeWidth = 6,
  color,
}: TimerRingProps) {
  const isMd = useBreakpoint(640)
  const actualSize = isMd ? mdSize : size
  const radius = (actualSize - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - progress)

  return (
    <svg
      width={actualSize}
      height={actualSize}
      className="rotate-[-90deg]"
      aria-hidden="true"
    >
      {/* Track */}
      <circle
        cx={actualSize / 2}
        cy={actualSize / 2}
        r={radius}
        fill="none"
        stroke="#333338"
        strokeWidth={strokeWidth}
      />
      {/* Progress */}
      <circle
        cx={actualSize / 2}
        cy={actualSize / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  )
}
