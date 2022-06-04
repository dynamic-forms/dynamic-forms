import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FormExampleBase } from '../form-example-base';

@Component({
  selector: 'app-material-examples',
  templateUrl: './material-examples.component.html',
})
export class MaterialExamplesComponent extends FormExampleBase {
  constructor(protected override route: ActivatedRoute, protected override dialog: MatDialog) {
    super(route, dialog);
  }
}
