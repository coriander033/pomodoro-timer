interface TomatoCounterProps {
  completed: number
  target: number
  onReset: () => void
}

export function TomatoCounter({ completed, target, onReset }: TomatoCounterProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1.5">
        {Array.from({ length: target }, (_, i) => (
          <svg
            key={i}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={i < completed ? '#E85D4A' : 'none'}
            stroke="#E85D4A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={i < completed ? 'drop-shadow-[0_0_4px_rgba(232,93,74,0.5)]' : 'opacity-30'}
          >
            <path d="M12 2C9 2 7 4 7 7c0 1 0 2 1 3l5 5 5-5c1-1 1-2 1-3 0-3-2-5-5-5" />
            <path d="M12 7c-1-1-2-2-2-3" />
          </svg>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted">
          {completed} / {target} 个番茄
        </span>
        <button
          onClick={onReset}
          disabled={completed === 0}
          className="text-xs text-muted underline underline-offset-2 transition-colors
            hover:text-foreground
            disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-muted"
        >
          清零
        </button>
      </div>
    </div>
  )
}
