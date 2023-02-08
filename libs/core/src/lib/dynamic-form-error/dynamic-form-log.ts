import { DynamicFormLogLevel } from './dynamic-form-log-level';

export interface DynamicFormLog {
  timestamp: Date;
  level: DynamicFormLogLevel;
  type: string;
  message?: any;
  data?: any[];
}
