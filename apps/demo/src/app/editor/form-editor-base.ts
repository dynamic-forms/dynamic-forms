import { ChangeDetectorRef, Directive, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormEditorData } from './form-editor-data';

@Directive({ standalone: true })
export abstract class FormEditorBase implements OnDestroy {
  private _subscriptions = new Subscription();
  private _data: FormEditorData;

  constructor(
    protected route: ActivatedRoute,
    protected cdr: ChangeDetectorRef,
  ) {
    this._subscriptions.add(
      this.route.data.subscribe(data => {
        const definition = data.definition;
        const model = data.model || {};
        this._data = { definition, model };
      }),
    );
  }

  get data(): FormEditorData {
    return this._data;
  }
  set data(data: FormEditorData) {
    this._data = data;
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
