import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { BsDynamicFormSelectComponent } from './dynamic-form-select.component';

export const bsDynamicFormSelectType: DynamicFormInputType = {
  library: 'bootstrap',
  type: 'select',
  component: BsDynamicFormSelectComponent,
  wrappers: [ 'label', 'hints', 'errors' ]
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withInput(bsDynamicFormSelectType)
  ],
  declarations: [
    BsDynamicFormSelectComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormSelectComponent
  ],
  entryComponents: [
    BsDynamicFormSelectComponent
  ]
})
export class BsDynamicFormSelectModule {}
