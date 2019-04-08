import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormDropdownComponent } from './dynamic-form-dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    DynamicFormDropdownComponent
  ],
  entryComponents: [
    DynamicFormDropdownComponent
  ]
})
export class DynamicFormDropdownModule {}
