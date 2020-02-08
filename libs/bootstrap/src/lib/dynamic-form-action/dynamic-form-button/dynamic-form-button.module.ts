import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DynamicFormActionType, DynamicFormConfigModule } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { BsDynamicFormButtonComponent } from './dynamic-form-button.component';

export const bsDynamicFormButtonType: DynamicFormActionType = {
  type: 'button',
  component: BsDynamicFormButtonComponent,
  libraryName: bsDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    DynamicFormConfigModule.withAction(bsDynamicFormButtonType)
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
