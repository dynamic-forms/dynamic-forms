import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormExampleBase } from '../dynamic-form-example-base';

@Component({
  selector: 'app-material-examples',
  templateUrl: './material-examples.component.html'
})
export class MaterialExamplesComponent extends DynamicFormExampleBase {
  constructor(protected route: ActivatedRoute, protected dialog: MatDialog) {
    super(route, dialog);
  }
}
