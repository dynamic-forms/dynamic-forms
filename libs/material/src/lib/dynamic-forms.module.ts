import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsModule, DynamicFormArrayModule, DynamicFormContainerModule, DynamicFormContentModule,
  DynamicFormControlModule, DynamicFormGroupModule, DynamicFormIdBuilder, DynamicFormMarkdownModule, DynamicFormValidationModule,
  DYNAMIC_FORM_ID_BUILDER, DYNAMIC_FORM_LIBRARY, DYNAMIC_FORM_THEME } from '@dynamic-forms/core';
import { MatDynamicFormActionModule } from './dynamic-form-action/dynamic-form-action.module';
import { MatDynamicFormElementModule } from './dynamic-form-element/dynamic-form-element.module';
import { MatDynamicFormInputModule} from './dynamic-form-input/dynamic-form-input.module';
import { matDynamicFormLibrary } from './dynamic-form-library/dynamic-form-library';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsModule,
    DynamicFormArrayModule,
    DynamicFormContainerModule,
    DynamicFormContentModule,
    DynamicFormMarkdownModule,
    DynamicFormControlModule,
    DynamicFormGroupModule,
    DynamicFormValidationModule.withValidation(),
    MatDynamicFormElementModule,
    MatDynamicFormActionModule,
    MatDynamicFormInputModule
  ],
  exports: [
    DynamicFormsModule
  ]
})
export class MatDynamicFormsModule {
  static forRoot(config?: { theme?: string, idBuilder?: DynamicFormIdBuilder }): ModuleWithProviders<MatDynamicFormsModule> {
    return {
      ngModule: MatDynamicFormsModule,
      providers: [
        {
          provide: DYNAMIC_FORM_LIBRARY,
          useValue: matDynamicFormLibrary
        },
        {
          provide: DYNAMIC_FORM_THEME,
          useValue: config && config.theme
        },
        {
          provide: DYNAMIC_FORM_ID_BUILDER,
          useValue: config && config.idBuilder
        }
      ]
    };
  }
}
