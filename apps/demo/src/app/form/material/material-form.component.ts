import { NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicFormComponent } from '@dynamic-forms/core';
import { FormBase } from '../form-base';
import { MaterialFormModule } from './material-form.module';

@Component({
  standalone: true,
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.scss'],
  imports: [NgIf, DynamicFormComponent, MaterialFormModule],
  encapsulation: ViewEncapsulation.None,
})
export class MaterialFormComponent extends FormBase {
  constructor(protected override dialog: MatDialog) {
    super(dialog);
  }
}
