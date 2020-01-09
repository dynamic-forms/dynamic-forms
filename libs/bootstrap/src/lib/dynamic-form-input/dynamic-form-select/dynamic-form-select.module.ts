import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfig, DynamicFormConfigModule } from '@dynamic-forms/core';
import { BsDynamicFormSelectComponent } from './dynamic-form-select.component';

export const bsDynamicFormSelectConfig: DynamicFormConfig = {
  library: 'material',
  inputConfig: {
    types: [
      { type: 'select', component: BsDynamicFormSelectComponent, wrappers: [ 'label', 'hints', 'errors' ] }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.forChild(bsDynamicFormSelectConfig)
  ],
  declarations: [
    BsDynamicFormSelectComponent
  ],
  entryComponents: [
    BsDynamicFormSelectComponent
  ]
})
export class BsDynamicFormSelectModule {}
