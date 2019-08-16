import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDynamicFormControlErrorsComponent } from './dynamic-form-control-errors.component';
import { BsDynamicFormControlHintsComponent } from './dynamic-form-control-hints.component';
import { BsDynamicFormControlLabelComponent } from './dynamic-form-control-label.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BsDynamicFormControlErrorsComponent,
    BsDynamicFormControlLabelComponent,
    BsDynamicFormControlHintsComponent
  ],
  entryComponents: [
    BsDynamicFormControlErrorsComponent,
    BsDynamicFormControlLabelComponent,
    BsDynamicFormControlHintsComponent
  ]
})
export class BsDynamicFormWrapperModule {}
