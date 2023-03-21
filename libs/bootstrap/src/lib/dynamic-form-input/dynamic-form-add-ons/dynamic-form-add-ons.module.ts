import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormElementModule } from '@dynamic-forms/core';
import { BsDynamicFormAddOnsComponent } from './dynamic-form-add-ons.component';

@NgModule({
  imports: [
    CommonModule,
    DynamicFormElementModule,
  ],
  declarations: [
    BsDynamicFormAddOnsComponent,
  ],
  exports: [
    BsDynamicFormAddOnsComponent,
  ],
})
export class BsDynamicFormAddOnsModule {}
