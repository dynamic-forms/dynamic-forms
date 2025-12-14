import { Directive, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FormEditorData } from './form-editor-data';

@Directive({})
export abstract class FormEditorBase {
  protected readonly route = inject(ActivatedRoute);

  readonly data = signal<FormEditorData>(undefined);

  constructor() {
    this.route.data.pipe(takeUntilDestroyed()).subscribe(data => {
      const definition = data.definition;
      const model = data.model || {};
      this.data.set({ definition, model });
    });
  }
}
