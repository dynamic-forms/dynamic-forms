import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { BsDynamicFormTextareaComponent } from './dynamic-form-textarea.component';

export const bsDynamicFormTextareaType: DynamicFormInputType = {
  library: 'bootstrap',
  type: 'textarea',
  component: BsDynamicFormTextareaComponent,
  wrappers: [ 'label', 'hints', 'errors' ]
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withInput(bsDynamicFormTextareaType)
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
