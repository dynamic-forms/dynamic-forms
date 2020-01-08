import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsModule, DynamicFormConfig } from '@dynamic-forms/core';
import { BsDynamicFormTextboxComponent } from './dynamic-form-textbox.component';

export const bsDynamicFormTextboxConfig: DynamicFormConfig = {
  library: 'material',
  inputConfig: {
    types: [
      { type: 'textbox', component: BsDynamicFormTextboxComponent, wrappers: [ 'label', 'hints', 'errors' ] }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsModule.forChild(bsDynamicFormTextboxConfig)
  ],
  declarations: [
    BsDynamicFormTextboxComponent
  ],
  entryComponents: [
    BsDynamicFormTextboxComponent
  ]
})
export class BsDynamicFormTextboxModule {}
