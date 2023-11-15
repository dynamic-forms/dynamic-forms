import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BootstrapFormModule } from '../../form/bootstrap/bootstrap-form.module';
import { FormExampleBase } from '../form-example-base';
import { FormExampleComponent } from '../form-example.component';

@Component({
  standalone: true,
  selector: 'app-bootstrap-examples',
  templateUrl: './bootstrap-examples.component.html',
  imports: [CommonModule, FormExampleComponent, BootstrapFormModule],
})
export class BootstrapExamplesComponent extends FormExampleBase {
  constructor(
    protected override route: ActivatedRoute,
    protected override dialog: MatDialog,
  ) {
    super(route, dialog);
  }
}
