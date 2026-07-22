interface TimerRingProps {
  progress: number // 0 to 1
  size?: number
  strokeWidth?: number
  color: string
}

export function TimerRing({
  progress,
  size = 280,
  strokeWidth = 6,
  color,
}: TimerRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - progress)

  return (
    <svg
      width={size}
      height={size}
      className="rotate-[-90deg]"
      aria-hidden="true"
    >
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#333338"
        strokeWidth={strokeWidth}
      />
      {/* Progress */}
      <circle
        cx={size / 2}
        cy={size / 2}
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
