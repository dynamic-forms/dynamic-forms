import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsModule, DynamicFormArrayModule, DynamicFormContainerModule, DynamicFormContentModule,
  DynamicFormControlModule, DynamicFormGroupModule, DynamicFormValidationModule,
  DYNAMIC_FORM_LIBRARY } from '@dynamic-forms/core';
import { MatDynamicFormActionModule } from './dynamic-form-action/dynamic-form-action.module';
import { matDynamicFormLibrary } from './dynamic-form-config/dynamic-form-library';
import { MatDynamicFormInputModule} from './dynamic-form-input/dynamic-form-input.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsModule,
    DynamicFormArrayModule,
    DynamicFormContainerModule,
    DynamicFormContentModule,
    DynamicFormControlModule,
    DynamicFormGroupModule,
    DynamicFormValidationModule.withValidation(),
    MatDynamicFormActionModule,
    MatDynamicFormInputModule
  ],
  exports: [
    DynamicFormsModule
  ]
})
export class MatDynamicFormsModule {
  static forRoot(): ModuleWithProviders<MatDynamicFormsModule> {
    return {
      ngModule: MatDynamicFormsModule,
      providers: [
        {
          provide: DYNAMIC_FORM_LIBRARY,
          useValue: matDynamicFormLibrary
        }
      ]
    };
  }
}
