import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  DYNAMIC_FORM_ID_BUILDER,
  DYNAMIC_FORM_LIBRARY,
  DYNAMIC_FORM_THEME,
  DynamicFormArrayModule,
  DynamicFormControlModule,
  DynamicFormDictionaryModule,
  DynamicFormElementModule,
  DynamicFormGroupModule,
  DynamicFormIdBuilder,
  DynamicFormValidationModule,
  DynamicFormsModule,
} from '@dynamic-forms/core';
import { MatDynamicFormActionModule } from './dynamic-form-action/dynamic-form-action.module';
import { MatDynamicFormElementModule } from './dynamic-form-element/dynamic-form-element.module';
import { MatDynamicFormInputModule } from './dynamic-form-input/dynamic-form-input.module';
import { matDynamicFormLibrary } from './dynamic-form-library/dynamic-form-library';

@NgModule({
  imports: [
    DynamicFormArrayModule,
    DynamicFormControlModule,
    DynamicFormDictionaryModule,
    DynamicFormElementModule,
    DynamicFormGroupModule,
    DynamicFormsModule,
    DynamicFormValidationModule.withValidation(),
    MatDynamicFormActionModule,
    MatDynamicFormElementModule,
    MatDynamicFormInputModule,
  ],
  exports: [DynamicFormsModule],
})
export class MatDynamicFormsModule {
  static forRoot(config?: { theme?: string; idBuilder?: DynamicFormIdBuilder }): ModuleWithProviders<MatDynamicFormsModule> {
    return {
      ngModule: MatDynamicFormsModule,
      providers: [
        {
          provide: DYNAMIC_FORM_LIBRARY,
          useValue: matDynamicFormLibrary,
        },
        {
          provide: DYNAMIC_FORM_THEME,
          useValue: config && config.theme,
        },
        {
          provide: DYNAMIC_FORM_ID_BUILDER,
          useValue: config && config.idBuilder,
        },
      ],
    };
  }
}
