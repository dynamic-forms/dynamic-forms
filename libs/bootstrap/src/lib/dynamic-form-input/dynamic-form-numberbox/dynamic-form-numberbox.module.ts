import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormNumberboxComponent } from './dynamic-form-numberbox.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    DynamicFormNumberboxComponent
  ],
  entryComponents: [
    DynamicFormNumberboxComponent
  ]
})
export class DynamicFormNumberboxModule {}
