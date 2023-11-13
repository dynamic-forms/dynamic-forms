import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DynamicFormErrorType, DynamicFormLog, DynamicFormLogLevel } from '@dynamic-forms/core';
import { Store } from '@ngxs/store';
import { Observable, Subscription, map } from 'rxjs';
import { bufferTime } from 'rxjs/operators';
import { FormBase } from '../form/form-base';
import { MonacoEditorComponent } from '../monaco/monaco-editor.component';
import { FormEditorPreviewMode } from '../state/preferences/preferences.model';
import { PreferencesState } from '../state/preferences/preferences.state';
import { FormEditorData } from './form-editor-data';
import { FormEditorLogger } from './form-editor-logger';
import { FormEditorLogsComponent } from './form-editor-logs.component';

@Component({
  standalone: true,
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss'],
  imports: [CommonModule, MatTabsModule, MonacoEditorComponent, FormEditorLogsComponent],
})
export class FormEditorComponent implements OnDestroy {
  private readonly _subscriptions = new Subscription();

  private _logs: DynamicFormLog[] = [];
  private _data: FormEditorData;
  private _value: string;

  readonly splitView$: Observable<boolean>;

  @Input()
  set data(data: FormEditorData) {
    this._data = data;
    this._value = JSON.stringify(data.definition, null, '\t');
  }
  get data(): FormEditorData {
    return this._data;
  }

  @ContentChild('form')
  form: FormBase;

  @Output() dataChange = new EventEmitter<FormEditorData>();

  constructor(
    private store: Store,
    private logger: FormEditorLogger,
  ) {
    this.splitView$ = this.store
      .select(PreferencesState.formEditor)
      .pipe(map(preferences => preferences?.previewMode === FormEditorPreviewMode.SplitView));
    this._subscriptions.add(
      this.logger.log$.pipe(bufferTime(1000)).subscribe(logs => {
        this._logs = [...logs.reverse(), ...this._logs];
      }),
    );
  }

  get value(): string {
    return this._value;
  }
  set value(value: string) {
    this.setValue(value);
  }

  get logs(): DynamicFormLog[] {
    return this._logs;
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private setValue(value: string) {
    this._value = value;
    try {
      this._data = { definition: JSON.parse(value), model: {} };
      this._logs = [];
      this.dataChange.emit(this._data);
    } catch (error) {
      const log = {
        timestamp: new Date(),
        level: DynamicFormLogLevel.Error,
        type: DynamicFormErrorType.Unspecified,
        message: 'Parsing JSON failed',
        data: [error],
      };
      this.logger.log(log);
    }
  }
}
