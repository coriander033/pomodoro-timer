import type { TimerStatus } from '../types'

interface ControlsProps {
  status: TimerStatus
  onStart: () => void
  onPause: () => void
  onReset: () => void
}

export function Controls({ status, onStart, onPause, onReset }: ControlsProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Start / Pause — primary action */}
      {status === 'running' ? (
        <button
          onClick={onPause}
          className="flex h-20 w-20 items-center justify-center rounded-full
            bg-tomato text-white shadow-lg shadow-tomato/30
            transition-transform hover:scale-105 active:scale-95"
          aria-label="暂停"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        </button>
      ) : (
        <button
          onClick={onStart}
          className="flex h-20 w-20 items-center justify-center rounded-full
            bg-tomato text-white shadow-lg shadow-tomato/30
            transition-transform hover:scale-105 active:scale-95"
          aria-label="开始"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}

      {/* Reset — secondary, below */}
      <button
        onClick={onReset}
        disabled={status === 'idle'}
        className="flex h-11 w-11 items-center justify-center rounded-full
          bg-surface/80 text-muted transition-all
          hover:bg-tomato/20 hover:text-foreground
          disabled:opacity-0 disabled:pointer-events-none"
        aria-label="重置"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 1 3 6.7" />
          <path d="M3 7v5h5" />
        </svg>
      </button>
    </div>
  )
}
