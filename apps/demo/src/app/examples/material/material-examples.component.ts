import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FormExampleBase } from '../form-example-base';

@Component({
  selector: 'app-material-examples',
  templateUrl: './material-examples.component.html'
})
export class MaterialExamplesComponent extends FormExampleBase {
  constructor(protected route: ActivatedRoute, protected dialog: MatDialog) {
    super(route, dialog);
  }
}
