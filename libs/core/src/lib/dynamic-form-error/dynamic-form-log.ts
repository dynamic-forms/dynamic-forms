import { DynamicFormLogLevel } from './dynamic-form-log-level';
import { DynamicFormLogType } from './dynamic-form-log-type';

export interface DynamicFormLog<LogType extends DynamicFormLogType = DynamicFormLogType> {
  timestamp: Date;
  level: DynamicFormLogLevel;
  type: LogType;
  message?: any;
  data?: any[];
}
