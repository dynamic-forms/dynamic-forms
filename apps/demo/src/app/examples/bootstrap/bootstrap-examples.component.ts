import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormExampleBase } from '../dynamic-form-example-base';

@Component({
  selector: 'app-bootstrap-examples',
  templateUrl: './bootstrap-examples.component.html'
})
export class BootstrapExamplesComponent extends DynamicFormExampleBase {
  constructor(protected route: ActivatedRoute, protected dialog: MatDialog) {
    super(route, dialog);
  }
}
