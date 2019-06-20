import { MatDialog } from '@angular/material';
import { ActivatedRoute, Data } from '@angular/router';
import { DynamicFormSubmit } from '@dynamic-forms/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DynamicFormData } from './dynamic-form-data';
import { DynamicFormDialogComponent } from './dynamic-form-dialog.component';

export abstract class DynamicFormExampleComponent {
  data$: Observable<DynamicFormData>;

  constructor(protected route: ActivatedRoute, protected dialog: MatDialog) {
    this.data$ = this.route.data.pipe(
      map(data => this.mapData(data))
    );
  }

  onFormSubmit(data: DynamicFormSubmit) {
    this.dialog.open(DynamicFormDialogComponent, { data });
  }

  private mapData(data: Data): DynamicFormData {
    return {
      definition: data.definition,
      model: {}
    };
  }
}
