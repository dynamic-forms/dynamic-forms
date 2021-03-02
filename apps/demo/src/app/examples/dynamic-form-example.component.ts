import { MatDialog } from '@angular/material';
import { ActivatedRoute, Data } from '@angular/router';
import { DynamicFormSubmit } from '@dynamic-forms/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DynamicFormData } from './dynamic-form-data';
import { DynamicFormDialogComponent } from './dynamic-form-dialog.component';

export abstract class DynamicFormExampleComponent {
  readonly data$: Observable<DynamicFormData>;
  readonly doc$: Observable<string>;

  constructor(protected route: ActivatedRoute, protected dialog: MatDialog) {
    this.data$ = this.route.data.pipe(
      map(data => this.mapData(data))
    );
    this.doc$ = this.data$.pipe(
      map(data => this.getDoc(data))
    );
  }

  onFormSubmit(data: DynamicFormSubmit): void {
    this.dialog.open(DynamicFormDialogComponent, { data });
  }

  private mapData(data: Data): DynamicFormData {
    const example = data.example;
    const definition = data.definition;
    const model = data.model || {};
    return { example, definition, model };
  }

  private getDoc(data: Data): string {
    const example = data.example;
    if (example.docId) {
      return example.path
        ? `./assets/examples/${example.path}/${example.docId}.md`
        : `./assets/examples/${example.docId}.md`;
    }
    return undefined;
  }
}
