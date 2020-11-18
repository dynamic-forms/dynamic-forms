import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormActionModule, DynamicFormActionType, DynamicFormConfigModule } from '@dynamic-forms/core';
import { BsDynamicFormDialogModule } from '../../dynamic-form-dialog/dynamic-form-dialog.module';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormButtonComponent } from './dynamic-form-button.component';

export const bsDynamicFormButtonType: DynamicFormActionType = {
  type: 'button',
  component: BsDynamicFormButtonComponent,
  libraryName: bsDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormActionModule,
    DynamicFormConfigModule.withAction(bsDynamicFormButtonType),
    BsDynamicFormDialogModule
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
