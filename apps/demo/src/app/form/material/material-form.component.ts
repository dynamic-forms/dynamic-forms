import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBase } from '../form-base';

@Component({
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MaterialFormComponent extends FormBase {
  constructor(protected dialog: MatDialog) {
    super(dialog);
  }
}
