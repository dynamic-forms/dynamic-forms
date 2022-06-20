import { Component, ContentChild } from '@angular/core';
import { DynamicFormDefinition } from '@dynamic-forms/core';
import { Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { FormBase } from '../form/form-base';
import { FormData } from '../form/form-data';
import { FormEditorPreviewMode } from '../state/preferences/preferences.model';
import { PreferencesState } from '../state/preferences/preferences.state';
import formDefinition from './form-editor.json';

@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss'],
})
export class FormEditorComponent {
  private _data: FormData;
  private _value;

  readonly splitView$: Observable<boolean>;

  @ContentChild('form')
  form: FormBase;

  constructor(private store: Store) {
    this.splitView$ = this.store.select(PreferencesState.formEditor).pipe(
      map(preferences => preferences?.previewMode === FormEditorPreviewMode.SplitView),
    );
    this.setDefinition(formDefinition as any);
  }

  get data(): FormData { return this._data; }

  get value(): string { return this._value; }
  set value(value: string) { this.setValue(value); }

  private setValue(value: string) {
    this._value = value;
    try {
      const definition = JSON.parse(value);
      const model = {};
      this._data = { definition, model };
    } catch (error) {
      console.log(error);
    }
  }

  private setDefinition(definition: DynamicFormDefinition) {
    this._data = { definition, model: {} } ;
    this._value = JSON.stringify(definition, null, '\t');
  }
}
