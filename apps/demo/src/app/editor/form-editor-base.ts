import { ChangeDetectorRef, Directive, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FormEditorData } from './form-editor-data';

@Directive({})
export abstract class FormEditorBase {
  private _data: FormEditorData;

  protected readonly route = inject(ActivatedRoute);
  protected readonly cdr = inject(ChangeDetectorRef);

  constructor() {
    this.route.data.pipe(takeUntilDestroyed()).subscribe(data => {
      const definition = data.definition;
      const model = data.model || {};
      this._data = { definition, model };
    });
  }

  get data(): FormEditorData {
    return this._data;
  }
  set data(data: FormEditorData) {
    this._data = data;
    this.cdr.detectChanges();
  }
}
