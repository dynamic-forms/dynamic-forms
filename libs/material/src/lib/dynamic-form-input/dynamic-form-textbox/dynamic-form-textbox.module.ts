import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormTextboxComponent } from './dynamic-form-textbox.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    DynamicFormTextboxComponent
  ],
  entryComponents: [
    DynamicFormTextboxComponent
  ]
})
export class DynamicFormTextboxModule {}
