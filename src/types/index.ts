export type TimerMode = 'focus' | 'shortBreak' | 'longBreak'

export type TimerStatus = 'idle' | 'running' | 'paused'

export interface Settings {
  focus: number      // minutes
  shortBreak: number // minutes
  longBreak: number  // minutes
  longBreakInterval: number // 几个番茄后长休息
}

export const DEFAULT_SETTINGS: Settings = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
}
