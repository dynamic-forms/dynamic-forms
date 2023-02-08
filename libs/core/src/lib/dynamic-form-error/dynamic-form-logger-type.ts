import { DynamicFormLibraryName } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLog } from './dynamic-form-log';

export type DynamicFormLogFunc = (log: DynamicFormLog) => void;

export interface DynamicFormLoggerType {
  type: string;
  libraryName: DynamicFormLibraryName;
  enabled: boolean;
  log: DynamicFormLogFunc;
}
