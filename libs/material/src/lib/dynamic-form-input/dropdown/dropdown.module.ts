import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDynamicFormValidationModule } from '../../dynamic-form-validation/dynamic-form-validation.module';
import { DropdownComponent } from './dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDynamicFormValidationModule
  ],
  declarations: [
    DropdownComponent
  ],
  entryComponents: [
    DropdownComponent
  ]
})
export class DropdownModule {}
