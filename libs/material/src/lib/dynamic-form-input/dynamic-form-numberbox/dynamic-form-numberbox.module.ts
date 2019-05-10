import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormNumberboxComponent } from './dynamic-form-numberbox.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    DynamicFormNumberboxComponent
  ],
  entryComponents: [
    DynamicFormNumberboxComponent
  ]
})
export class DynamicFormNumberboxModule {}
