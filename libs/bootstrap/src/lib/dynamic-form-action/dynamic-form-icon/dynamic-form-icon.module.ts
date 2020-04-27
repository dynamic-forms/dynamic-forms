import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DynamicFormActionType, DynamicFormConfigModule, DynamicFormIconModule } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormIconComponent } from './dynamic-form-icon.component';

export const bsDynamicFormIconType: DynamicFormActionType = {
  type: 'icon',
  component: BsDynamicFormIconComponent,
  libraryName: bsDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    DynamicFormIconModule,
    DynamicFormConfigModule.withAction(bsDynamicFormIconType)
  ],
  declarations: [
    BsDynamicFormIconComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormIconComponent
  ],
  entryComponents: [
    BsDynamicFormIconComponent
  ]
})
export class BsDynamicFormIconModule {}
