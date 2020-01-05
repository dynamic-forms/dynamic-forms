import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsModule } from '../dynamic-forms.module';
import { DynamicFormControlComponent } from './dynamic-form-control.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsModule.forChild({
      fieldConfig: {
        types: [
          { type: 'control', component: DynamicFormControlComponent }
        ]
      }
    })
  ],
  declarations: [
    DynamicFormControlComponent
  ],
  exports: [
    DynamicFormsModule,
    DynamicFormControlComponent
  ],
  entryComponents: [
    DynamicFormControlComponent
  ]
})
export class DynamicFormControlModule {}
