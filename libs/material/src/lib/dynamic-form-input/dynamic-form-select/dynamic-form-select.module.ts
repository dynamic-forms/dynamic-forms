import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DynamicFormSelectComponent } from './dynamic-form-select.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  declarations: [
    DynamicFormSelectComponent
  ],
  entryComponents: [
    DynamicFormSelectComponent
  ]
})
export class DynamicFormSelectModule {}
