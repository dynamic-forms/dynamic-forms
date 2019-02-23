import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DynamicFormsCoreModule } from '@dynamic-forms/core';
import { DynamicFormArrayComponent } from '@dynamic-forms/core';
import { DynamicFormGroupComponent } from '@dynamic-forms/core';
import { DynamicFormComponentFactory } from '@dynamic-forms/core';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from '@dynamic-forms/core';
import { DynamicFormConfigService } from '@dynamic-forms/core';
import { DynamicFormValidationBuilder } from '@dynamic-forms/core';
import { DynamicFormFieldExpressionsBuilder } from '@dynamic-forms/core';
import { DynamicFormBuilder } from '@dynamic-forms/core';
import { CheckboxComponent } from './dynamic-form-control/checkbox/checkbox.component';
import { CheckboxModule } from './dynamic-form-control/checkbox/checkbox.module';
import { MatDynamicFormControlComponent } from './dynamic-form-control/dynamic-form-control.component';
import { NumberboxComponent } from './dynamic-form-control/numberbox/numberbox.component';
import { NumberboxModule } from './dynamic-form-control/numberbox/numberbox.module';
import { SelectComponent } from './dynamic-form-control/select/select.component';
import { SelectModule } from './dynamic-form-control/select/select.module';
import { TextboxComponent } from './dynamic-form-control/textbox/textbox.component';
import { TextboxModule } from './dynamic-form-control/textbox/textbox.module';

const defaultConfig: DynamicFormConfig = {
  module: 'material',
  fieldConfig: {
    types: [
      { type: 'group', component: DynamicFormGroupComponent },
      { type: 'array', component: DynamicFormArrayComponent },
      { type: 'control', component: MatDynamicFormControlComponent }
    ]
  },
  controlConfig: {
    types: [
      { type: 'checkbox', component: CheckboxComponent },
      { type: 'text', component: TextboxComponent},
      { type: 'email', component: TextboxComponent },
      { type: 'password', component: TextboxComponent},
      { type: 'number', component: NumberboxComponent },
      { type: 'select', component: SelectComponent }
    ],
    defaultType: null
  },
  validationConfig: {
    defaultMessage: 'The field is invalid.',
    messages: {
      required: 'The field is required.',
      email: 'The field is not an email.',
      pattern: 'The field does not fit the pattern.',
      min: 'The field does not fit the min value',
      max: 'The field does not fit the max value',
      minlength: 'The field does not fit the min length',
      maxlength: 'The field does not fit the max length'
    }
  }
};

export function configureFormConfigService(configs: DynamicFormConfig[]): DynamicFormConfigService {
  const config = configs.find(c => c.module === defaultConfig.module);
  return new DynamicFormConfigService(config);
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsCoreModule,
    MatFormFieldModule,
    CheckboxModule,
    TextboxModule,
    NumberboxModule,
    SelectModule
  ],
  declarations: [
    MatDynamicFormControlComponent
  ],
  exports: [
    DynamicFormsCoreModule
  ],
  entryComponents: [
    MatDynamicFormControlComponent,
    CheckboxComponent,
    TextboxComponent,
    NumberboxComponent,
    SelectComponent
  ]
})
export class DynamicFormsMaterialModule {
  static forRoot(config: DynamicFormConfig = defaultConfig): ModuleWithProviders {
    return {
      ngModule: DynamicFormsMaterialModule,
      providers: [
        {
          provide: DYNAMIC_FORM_CONFIG,
          useValue: config,
          multi: true
        },
        {
          provide: DynamicFormConfigService,
          useFactory: configureFormConfigService,
          deps: [ DYNAMIC_FORM_CONFIG ]
        },
        DynamicFormBuilder,
        DynamicFormFieldExpressionsBuilder,
        DynamicFormValidationBuilder,
        DynamicFormComponentFactory
      ]
    };
  }
}
