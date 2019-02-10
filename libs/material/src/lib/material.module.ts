import { NgModule } from '@angular/core';
import { DynamicFormsCoreModule } from '@dynamic-forms/core';

@NgModule({
  imports: [
    DynamicFormsCoreModule.forRoot()
  ],
  exports: [
    DynamicFormsCoreModule
  ]
})
export class DynamicFormsMaterialModule {}
