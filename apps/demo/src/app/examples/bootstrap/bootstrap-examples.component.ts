import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BootstrapFormComponent } from '../../form/bootstrap/bootstrap-form.component';
import { FormExampleBase } from '../form-example-base';
import { FormExampleComponent } from '../form-example.component';

@Component({
  standalone: true,
  selector: 'app-bootstrap-examples',
  templateUrl: './bootstrap-examples.component.html',
  imports: [AsyncPipe, NgIf, FormExampleComponent, BootstrapFormComponent],
})
export class BootstrapExamplesComponent extends FormExampleBase {
  constructor(
    protected override route: ActivatedRoute,
    protected override dialog: MatDialog,
  ) {
    super(route, dialog);
  }
}
