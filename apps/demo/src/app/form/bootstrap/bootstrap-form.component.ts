import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBase } from '../form-base';
import { BootstrapFormModule } from './bootstrap-form.module';

@Component({
  standalone: true,
  selector: 'app-bootstrap-form',
  templateUrl: './bootstrap-form.component.html',
  styleUrl: './bootstrap-form.component.scss',
  imports: [BootstrapFormModule],
})
export class BootstrapFormComponent extends FormBase {
  constructor(protected override dialog: MatDialog) {
    super(dialog);
  }
}
