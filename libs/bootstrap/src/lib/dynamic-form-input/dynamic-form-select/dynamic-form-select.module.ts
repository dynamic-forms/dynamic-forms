import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormSelectComponent } from './dynamic-form-select.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    DynamicFormSelectComponent
  ],
  entryComponents: [
    DynamicFormSelectComponent
  ]
})
export class DynamicFormSelectModule {}
