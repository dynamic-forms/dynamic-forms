import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDynamicFormControlHintsComponent } from './dynamic-form-control-hints.component';
import { BsDynamicFormControlLabelComponent } from './dynamic-form-control-label.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BsDynamicFormControlLabelComponent,
    BsDynamicFormControlHintsComponent
  ],
  entryComponents: [
    BsDynamicFormControlLabelComponent,
    BsDynamicFormControlHintsComponent
  ]
})
export class BsDynamicFormWrapperModule {}
