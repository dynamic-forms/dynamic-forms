import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MaterialFormComponent } from '../../form/material/material-form.component';
import { FormExampleBase } from '../form-example-base';
import { FormExampleComponent } from '../form-example.component';

@Component({
  standalone: true,
  selector: 'app-material-examples',
  templateUrl: './material-examples.component.html',
  imports: [AsyncPipe, NgIf, FormExampleComponent, MaterialFormComponent],
})
export class MaterialExamplesComponent extends FormExampleBase {
  constructor(
    protected override route: ActivatedRoute,
    protected override dialog: MatDialog,
  ) {
    super(route, dialog);
  }
}
