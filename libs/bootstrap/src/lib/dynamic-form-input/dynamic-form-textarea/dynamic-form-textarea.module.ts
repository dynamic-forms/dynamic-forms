import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfig, DynamicFormConfigModule } from '@dynamic-forms/core';
import { BsDynamicFormTextareaComponent } from './dynamic-form-textarea.component';

export const bsDynamicFormTextareaConfig: DynamicFormConfig = {
  library: 'bootstrap',
  inputConfig: {
    types: [
      { type: 'textarea', component: BsDynamicFormTextareaComponent, wrappers: [ 'label', 'hints', 'errors' ] }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.forChild(bsDynamicFormTextareaConfig)
  ],
  declarations: [
    BsDynamicFormTextareaComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormTextareaComponent
  ],
  entryComponents: [
    BsDynamicFormTextareaComponent
  ]
})
export class BsDynamicFormTextareaModule {}
