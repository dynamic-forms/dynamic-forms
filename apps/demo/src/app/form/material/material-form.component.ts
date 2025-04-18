import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBase } from '../form-base';
import { MaterialFormModule } from './material-form.module';

@Component({
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  imports: [MaterialFormModule],
})
export class MaterialFormComponent extends FormBase {
  constructor(protected override dialog: MatDialog) {
    super(dialog);
  }
}
