import { NgModule } from '@angular/core';
import { DynamicFormActionModule } from '@dynamic-forms/core';
import { MatDynamicFormButtonModule } from './dynamic-form-button/dynamic-form-button.module';

@NgModule({
  imports: [
    DynamicFormActionModule,
    MatDynamicFormButtonModule
  ],
  exports: [
    DynamicFormActionModule
  ]
})
export class MatDynamicFormActionModule {}
