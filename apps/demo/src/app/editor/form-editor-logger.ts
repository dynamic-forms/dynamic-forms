import { Injectable } from '@angular/core';
import { DynamicFormLogLevel } from '@dynamic-forms/core';
import { Observable, Subject } from 'rxjs';

export interface FormEditorLog {
  timestamp: Date;
  logLevel: DynamicFormLogLevel;
  message?: any;
  data?: any[];
}

@Injectable()
export class FormEditorLogger {
  private readonly logSubject = new Subject<FormEditorLog>();
  readonly log$: Observable<FormEditorLog> = this.logSubject.asObservable();

  log(logLevel: DynamicFormLogLevel, message?: any, ...data: any[]): void {
    this.logSubject.next({ timestamp: new Date(), logLevel, message, data });
  }
}
