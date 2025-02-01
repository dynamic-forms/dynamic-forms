import { Injectable } from '@angular/core';
import { DynamicFormLog, DynamicFormLoggerType, dynamicFormLibrary } from '@dynamic-forms/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class FormLogger {
  private readonly logSubject = new Subject<DynamicFormLog>();
  readonly log$: Observable<DynamicFormLog> = this.logSubject.asObservable();

  log(log: DynamicFormLog): void {
    this.logSubject.next(log);
  }
}

export const formLoggerTypeFactory: (logger: FormLogger) => DynamicFormLoggerType = logger => {
  return {
    type: 'dynamic-form-logger',
    libraryName: dynamicFormLibrary.name,
    enabled: true,
    log: (log: DynamicFormLog) => logger.log(log),
  };
};
