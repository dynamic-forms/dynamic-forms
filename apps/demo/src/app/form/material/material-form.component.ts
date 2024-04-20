import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicFormComponent } from '@dynamic-forms/core';
import { FormBase } from '../form-base';
import { provideMaterialForm } from './material-form.module';

@Component({
  standalone: true,
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrl: './material-form.component.scss',
  imports: [DynamicFormComponent],
  providers: provideMaterialForm(),
})
export class MaterialFormComponent extends FormBase {
  constructor(protected override dialog: MatDialog) {
    super(dialog);
  }
}
