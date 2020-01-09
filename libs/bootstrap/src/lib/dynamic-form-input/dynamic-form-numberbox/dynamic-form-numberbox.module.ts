import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfig, DynamicFormConfigModule } from '@dynamic-forms/core';
import { BsDynamicFormNumberboxComponent } from './dynamic-form-numberbox.component';

export const bsDynamicFormNumberboxConfig: DynamicFormConfig = {
  library: 'bootstrap',
  inputConfig: {
    types: [
      { type: 'numberbox', component: BsDynamicFormNumberboxComponent, wrappers: [ 'label', 'hints', 'errors' ] }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.forChild(bsDynamicFormNumberboxConfig)
  ],
  declarations: [
    BsDynamicFormNumberboxComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormNumberboxComponent
  ],
  entryComponents: [
    BsDynamicFormNumberboxComponent
  ]
})
export class BsDynamicFormNumberboxModule {}
