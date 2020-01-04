import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { getDynamicFormProviders, DynamicFormsModule, DynamicFormArrayModule,
  DynamicFormConfig, DynamicFormControlModule, DynamicFormGroupModule } from '@dynamic-forms/core';
import { MatDynamicFormInputModule} from './dynamic-form-input/dynamic-form-input.module';
import { matDynamicFormConfig } from './dynamic-forms.config';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsModule,
    DynamicFormArrayModule,
    DynamicFormControlModule,
    DynamicFormGroupModule,
    MatDynamicFormInputModule
  ],
  exports: [
    DynamicFormsModule
  ]
})
export class MatDynamicFormsModule {
  static forRoot(config?: DynamicFormConfig): ModuleWithProviders {
    return {
      ngModule: MatDynamicFormsModule,
      providers: getDynamicFormProviders(matDynamicFormConfig, config)
    };
  }
}
