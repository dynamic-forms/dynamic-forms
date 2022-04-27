import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormSubmitBase } from '../form/form-submit-base';
import { FormExampleData } from './form-example-data';

export abstract class FormExampleBase extends FormSubmitBase {
  readonly data$: Observable<FormExampleData>;
  readonly doc$: Observable<string>;

  constructor(protected route: ActivatedRoute, protected override dialog: MatDialog) {
    super(dialog);
    this.data$ = this.route.data.pipe(
      map(data => this.mapData(data))
    );
    this.doc$ = this.data$.pipe(
      map(data => this.getDoc(data))
    );
  }

  private mapData(data: Data): FormExampleData {
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
