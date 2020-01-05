import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsModule } from '../dynamic-forms.module';
import { DynamicFormArrayComponent } from './dynamic-form-array.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsModule.forChild({
      fieldConfig: {
        types: [
          { type: 'array', component: DynamicFormArrayComponent }
        ]
      }
    })
  ],
  declarations: [
    DynamicFormArrayComponent
  ],
  exports: [
    DynamicFormsModule,
    DynamicFormArrayComponent
  ],
  entryComponents: [
    DynamicFormArrayComponent
  ]
})
export class DynamicFormArrayModule {}
