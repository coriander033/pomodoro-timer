import { useState, useRef, useCallback, useEffect } from 'react'
import type { TimerStatus } from '../types'

interface UseTimerOptions {
  initialSeconds: number
  onComplete: () => void
}

export function useTimer({ initialSeconds, onComplete }: UseTimerOptions) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)
  const [progress, setProgress] = useState(0) // 0 → 1, smooth
  const [status, setStatus] = useState<TimerStatus>('idle')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const totalRef = useRef(initialSeconds)
  const targetEndRef = useRef<number>(0)

  // Always hold the latest onComplete in a ref so the interval callback
  // never captures a stale closure.
  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  // Reset when initialSeconds changes (mode switch)
  useEffect(() => {
    totalRef.current = initialSeconds
    setSecondsLeft(initialSeconds)
    setProgress(0)
    setStatus('idle')
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [initialSeconds])

  const tick = useCallback(() => {
    const now = Date.now()
    const elapsed = (now - (targetEndRef.current - totalRef.current * 1000)) / 1000
    const total = totalRef.current
    const remaining = Math.round((targetEndRef.current - now) / 1000)

    // Update smooth progress every frame tick
    const pct = Math.min(Math.max(elapsed / total, 0), 1)
    setProgress(pct)

    if (remaining <= 0) {
      setSecondsLeft(0)
      setProgress(1)
      setStatus('idle')
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      onCompleteRef.current()
      return
    }

    setSecondsLeft(remaining)
  }, [])

  const start = useCallback(() => {
    if (status === 'running') return

    targetEndRef.current = Date.now() + secondsLeft * 1000
    totalRef.current = secondsLeft
    setStatus('running')
    // Run at ~30fps for smooth ring animation
    intervalRef.current = setInterval(tick, 33)
  }, [status, secondsLeft, tick])

  const pause = useCallback(() => {
    if (status !== 'running') return
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setStatus('paused')
  }, [status])

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    totalRef.current = initialSeconds
    setSecondsLeft(initialSeconds)
    setProgress(0)
    setStatus('idle')
  }, [initialSeconds])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return { secondsLeft, progress, status, start, pause, reset }
}
