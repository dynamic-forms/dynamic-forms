import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormTextboxComponent } from './dynamic-form-textbox.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    DynamicFormTextboxComponent
  ],
  entryComponents: [
    DynamicFormTextboxComponent
  ]
})
export class DynamicFormTextboxModule {}
