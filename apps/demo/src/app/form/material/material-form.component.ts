import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBase } from '../form-base';
import { MaterialFormModule } from './material-form.module';

@Component({
  standalone: true,
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrl: './material-form.component.scss',
  imports: [MaterialFormModule],
})
export class MaterialFormComponent extends FormBase {
  constructor(protected override dialog: MatDialog) {
    super(dialog);
  }
}
