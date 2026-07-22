import { formatTime } from '../utils/time'

interface TimerDisplayProps {
  secondsLeft: number
}

export function TimerDisplay({ secondsLeft }: TimerDisplayProps) {
  return (
    <div className="font-mono text-5xl sm:text-7xl font-bold tracking-tight text-foreground select-none">
      {formatTime(secondsLeft)}
    </div>
  )
}
