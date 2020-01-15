import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { BsDynamicFormTextboxComponent } from './dynamic-form-textbox.component';

export const bsDynamicFormTextboxType: DynamicFormInputType = {
  type: 'textbox',
  component: BsDynamicFormTextboxComponent,
  wrappers: [ 'label', 'hints', 'errors' ]
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withInput(bsDynamicFormTextboxType)
  ],
  declarations: [
    BsDynamicFormTextboxComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormTextboxComponent
  ],
  entryComponents: [
    BsDynamicFormTextboxComponent
  ]
})
export class BsDynamicFormTextboxModule {}
