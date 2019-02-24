import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDynamicFormValidationModule } from '../../dynamic-form-validation/dynamic-form-validation.module';
import { NumberboxComponent } from './numberbox.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDynamicFormValidationModule
  ],
  declarations: [
    NumberboxComponent
  ],
  entryComponents: [
    NumberboxComponent
  ]
})
export class NumberboxModule {}
