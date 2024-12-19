export interface Action {
  action: string;
  centerX: number;
  centerY: number;
  centerX2?: number;
  centerY2?: number;
}

export interface TaskMeasurements {
  userId: string;
  taskSet: string;
  task: string;
  measurements: Measurement[];
}

export interface Measurement {
  action: string;
  touchX: number;
  touchY: number;
  touchX2?: number;
  touchY2?: number;
  centerX: number;
  centerY: number;
  timestamp: number;
}
