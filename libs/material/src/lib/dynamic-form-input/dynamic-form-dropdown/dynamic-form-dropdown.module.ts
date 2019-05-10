import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DynamicFormDropdownComponent } from './dynamic-form-dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  declarations: [
    DynamicFormDropdownComponent
  ],
  entryComponents: [
    DynamicFormDropdownComponent
  ]
})
export class DynamicFormDropdownModule {}
