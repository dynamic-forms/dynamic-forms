import { NgModule } from '@angular/core';
import { DynamicFormActionModule } from '@dynamic-forms/core';
import { BsDynamicFormButtonModule } from './dynamic-form-button/dynamic-form-button.module';
import { BsDynamicFormIconModule } from './dynamic-form-icon/dynamic-form-icon.module';

@NgModule({
  imports: [
    DynamicFormActionModule,
    BsDynamicFormButtonModule,
    BsDynamicFormIconModule
  ],
  exports: [
    DynamicFormActionModule
  ]
})
export class BsDynamicFormActionModule {}
