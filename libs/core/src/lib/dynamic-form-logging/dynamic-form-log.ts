import { DynamicFormLogLevel } from './dynamic-form-log-level';
import { DynamicFormLogType } from './dynamic-form-log-type';

export interface DynamicFormLog {
  timestamp: Date;
  level: DynamicFormLogLevel;
  type: DynamicFormLogType;
  message?: any;
  data?: any[];
}
