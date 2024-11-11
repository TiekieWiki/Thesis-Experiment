export interface UserClick {
  x: number
  y: number
  timestamp: number
}

export interface TaskMeasurements {
  task: string
  taskSet: string
  measurements: Measurement[]
}

export interface Measurement {
  action: string
  touchX: number
  touchY: number
  centerX: number
  centerY: number
  timestamp: number
}
