import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { dynamicFormProviders, DynamicFormsModule, DynamicFormArrayModule, DynamicFormConfig,
  DynamicFormContainerModule, DynamicFormContentModule, DynamicFormControlModule, DynamicFormGroupModule,
  DYNAMIC_FORM_CONFIG, DYNAMIC_FORM_LIBRARY } from '@dynamic-forms/core';
import { MatDynamicFormInputModule} from './dynamic-form-input/dynamic-form-input.module';
import { matDynamicFormConfig } from './dynamic-forms.config';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsModule.forRoot(),
    DynamicFormArrayModule,
    DynamicFormContainerModule,
    DynamicFormContentModule,
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
      providers: [
        {
          provide: DYNAMIC_FORM_LIBRARY,
          useValue: config ? config.library : matDynamicFormConfig.library
        },
        {
          provide: DYNAMIC_FORM_CONFIG,
          useValue: config || matDynamicFormConfig,
          multi: true
        },
        ...dynamicFormProviders
      ]
    };
  }

  static forChild(config: DynamicFormConfig): ModuleWithProviders {
    return {
      ngModule: MatDynamicFormsModule,
      providers: [
        {
          provide: DYNAMIC_FORM_CONFIG,
          useValue: config,
          multi: true
        }
      ]
    };
  }
}
