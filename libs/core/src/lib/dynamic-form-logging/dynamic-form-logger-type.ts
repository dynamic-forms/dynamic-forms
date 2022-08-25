import { DynamicFormLibraryName } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLogLevel } from './dynamic-form-log-level';

export type DynamicFormLogFunc = (logLevel: DynamicFormLogLevel, message?: any, ...data: any[]) => void;

export interface DynamicFormLoggerType {
  type: string;
  libraryName: DynamicFormLibraryName;
  enabled: boolean;
  log: DynamicFormLogFunc;
}
