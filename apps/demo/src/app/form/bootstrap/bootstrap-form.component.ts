import { NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicFormComponent } from '@dynamic-forms/core';
import { FormBase } from '../form-base';
import { BootstrapFormModule } from './bootstrap-form.module';

@Component({
  standalone: true,
  selector: 'app-bootstrap-form',
  templateUrl: './bootstrap-form.component.html',
  styleUrls: ['./bootstrap-form.component.scss'],
  imports: [NgIf, DynamicFormComponent, BootstrapFormModule],
  encapsulation: ViewEncapsulation.None,
})
export class BootstrapFormComponent extends FormBase {
  constructor(protected override dialog: MatDialog) {
    super(dialog);
  }
}
