import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsCoreModule } from '@dynamic-forms/core';
import { FormArrayComponent } from '@dynamic-forms/core';
import { FormGroupComponent } from '@dynamic-forms/core';
import { FormComponentFactory } from '@dynamic-forms/core';
import { FormConfig, FORM_CONFIG } from '@dynamic-forms/core';
import { FormConfigService } from '@dynamic-forms/core';
import { FormControlBuilder } from '@dynamic-forms/core';
import { FormArrayBuilder } from '@dynamic-forms/core';
import { FormValidationBuilder } from '@dynamic-forms/core';
import { FormGroupBuilder } from '@dynamic-forms/core';
import { FormBuilder } from '@dynamic-forms/core';
import { CheckboxComponent } from './form-control/checkbox/checkbox.component';
import { CheckboxModule } from './form-control/checkbox/checkbox.module';
import { MaterialFormControlComponent } from './form-control/form-control.component';
import { NumberboxComponent } from './form-control/numberbox/numberbox.component';
import { NumberboxModule } from './form-control/numberbox/numberbox.module';
import { SelectComponent } from './form-control/select/select.component';
import { SelectModule } from './form-control/select/select.module';
import { TextboxComponent } from './form-control/textbox/textbox.component';
import { TextboxModule } from './form-control/textbox/textbox.module';

const defaultFormConfig: FormConfig = {
  module: 'material',
  fieldConfig: {
    types: [
      { type: 'group', component: FormGroupComponent },
      { type: 'array', component: FormArrayComponent },
      { type: 'control', component: MaterialFormControlComponent }
    ]
  },
  controlConfig: {
    defaultType: null,
    types: [
      { type: 'checkbox', component: CheckboxComponent },
      { type: 'text', component: TextboxComponent },
      { type: 'email', component: TextboxComponent },
      { type: 'password', component: TextboxComponent },
      { type: 'number', component: NumberboxComponent },
      { type: 'select', component: SelectComponent }
    ]
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

export function configureFormConfigService(formConfigs: FormConfig[]): FormConfigService {
  const formConfig = formConfigs.find(config => config.module === defaultFormConfig.module);
  return new FormConfigService(formConfig);
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsCoreModule,
    CheckboxModule,
    TextboxModule,
    NumberboxModule,
    SelectModule
  ],
  declarations: [
    MaterialFormControlComponent
  ],
  exports: [
    DynamicFormsCoreModule
  ],
  entryComponents: [
    MaterialFormControlComponent,
    CheckboxComponent,
    TextboxComponent,
    NumberboxComponent,
    SelectComponent
  ]
})
export class DynamicFormsMaterialModule {
  static forRoot(formConfig: FormConfig = defaultFormConfig): ModuleWithProviders {
    return {
      ngModule: DynamicFormsMaterialModule,
      providers: [
        {
          provide: FORM_CONFIG,
          useValue: formConfig,
          multi: true
        },
        {
          provide: FormConfigService,
          useFactory: configureFormConfigService,
          deps: [ FORM_CONFIG ]
        },
        FormBuilder,
        FormGroupBuilder,
        FormArrayBuilder,
        FormControlBuilder,
        FormValidationBuilder,
        FormComponentFactory
      ]
    };
  }
}
