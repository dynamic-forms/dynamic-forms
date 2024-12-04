import { Injectable } from '@angular/core';
import { DynamicFormLog } from '@dynamic-forms/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class FormLogger {
  private readonly logSubject = new Subject<DynamicFormLog>();
  readonly log$: Observable<DynamicFormLog> = this.logSubject.asObservable();

  log(log: DynamicFormLog): void {
    this.logSubject.next(log);
  }
}
