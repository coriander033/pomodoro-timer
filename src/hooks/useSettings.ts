import { useState, useCallback } from 'react'
import { type Settings, DEFAULT_SETTINGS } from '../types'
import { clamp } from '../utils/time'

const STORAGE_KEY = 'pomodoro-settings'

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SETTINGS
    const parsed = JSON.parse(raw)
    return { ...DEFAULT_SETTINGS, ...parsed }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(loadSettings)

  const LIMITS: Record<keyof Settings, { min: number; max: number }> = {
    focus: { min: 1, max: 120 },
    shortBreak: { min: 1, max: 20 },
    longBreak: { min: 1, max: 60 },
    longBreakInterval: { min: 1, max: 8 },
  }

  const updateSetting = useCallback(
    (key: keyof Settings, value: number) => {
      const { min, max } = LIMITS[key]
      const clamped = clamp(Math.round(value), min, max)
      setSettings((prev) => {
        const next = { ...prev, [key]: clamped }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        return next
      })
    },
    [],
  )

  return { settings, updateSetting }
}
