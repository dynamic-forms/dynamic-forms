import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DynamicFormConfigModule, DynamicFormElementType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { BsDynamicFormButtonComponent } from './dynamic-form-button.component';

export const bsDynamicFormButtonType: DynamicFormElementType = {
  type: 'button',
  component: BsDynamicFormButtonComponent,
  libraryName: bsDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    DynamicFormConfigModule.withElement(bsDynamicFormButtonType)
  ],
  declarations: [
    BsDynamicFormButtonComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormButtonComponent
  ],
  entryComponents: [
    BsDynamicFormButtonComponent
  ]
})
export class BsDynamicFormButtonModule {}
