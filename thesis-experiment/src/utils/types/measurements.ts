export interface Action {
  action: string;
  centerX: number;
  centerY: number;
}

export interface TaskMeasurements {
  task: string;
  taskSet: string;
  measurements: Measurement[];
}

export interface Measurement {
  action: string;
  touchX: number;
  touchY: number;
  centerX: number;
  centerY: number;
  timestamp: number;
}
