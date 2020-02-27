import { NgModule } from '@angular/core';
import { DynamicFormActionModule } from '@dynamic-forms/core';
import { BsDynamicFormButtonModule } from './dynamic-form-button/dynamic-form-button.module';

@NgModule({
  imports: [
    DynamicFormActionModule,
    BsDynamicFormButtonModule
  ],
  exports: [
    DynamicFormActionModule
  ]
})
export class BsDynamicFormActionModule {}
