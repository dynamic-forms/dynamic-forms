import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsCoreModule } from '@dynamic-forms/core';
import { DynamicFormArrayComponent } from '@dynamic-forms/core';
import { DynamicFormGroupComponent } from '@dynamic-forms/core';
import { DynamicFormComponentFactory } from '@dynamic-forms/core';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from '@dynamic-forms/core';
import { DynamicFormConfigService } from '@dynamic-forms/core';
import { DynamicFormValidationBuilder } from '@dynamic-forms/core';
import { DynamicFormBuilder } from '@dynamic-forms/core';
import { DynamicFormFieldExpressionsBuilder } from '@dynamic-forms/core';
import { CheckboxComponent } from './dynamic-form-control/checkbox/checkbox.component';
import { CheckboxModule } from './dynamic-form-control/checkbox/checkbox.module';
import { BootstrapDynamicFormControlComponent } from './dynamic-form-control/dynamic-form-control.component';
import { NumberboxComponent } from './dynamic-form-control/numberbox/numberbox.component';
import { NumberboxModule } from './dynamic-form-control/numberbox/numberbox.module';
import { SelectComponent } from './dynamic-form-control/select/select.component';
import { SelectModule } from './dynamic-form-control/select/select.module';
import { TextboxComponent } from './dynamic-form-control/textbox/textbox.component';
import { TextboxModule } from './dynamic-form-control/textbox/textbox.module';
import { BootstrapDynamicLabelWrapperComponent } from './dynamic-form-field-wrapper/dynamic-label-wrapper.component';
import { BootstrapDynamicFormValidationComponent } from './dynamic-form-validation/dynamic-form-validation.component';

const defaultConfig: DynamicFormConfig = {
  module: 'bootstrap',
  fieldConfig: {
    types: [
      { type: 'group', component: DynamicFormGroupComponent },
      { type: 'array', component: DynamicFormArrayComponent },
      { type: 'control', component: BootstrapDynamicFormControlComponent }
    ]
  },
  wrapperConfig: {
    types: [
      { type: 'label', component: BootstrapDynamicLabelWrapperComponent }
    ]
  },
  controlConfig: {
    defaultType: null,
    types: [
      { type: 'checkbox', component: CheckboxComponent },
      { type: 'text', component: TextboxComponent, wrappers: [ 'label' ] },
      { type: 'email', component: TextboxComponent, wrappers: [ 'label' ] },
      { type: 'password', component: TextboxComponent, wrappers: [ 'label' ] },
      { type: 'number', component: NumberboxComponent, wrappers: [ 'label' ] },
      { type: 'select', component: SelectComponent, wrappers: [ 'label' ] }
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

export function configureFormConfigService(configs: DynamicFormConfig[]): DynamicFormConfigService {
  const config = configs.find(c => c.module === defaultConfig.module);
  return new DynamicFormConfigService(config);
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
    BootstrapDynamicFormControlComponent,
    BootstrapDynamicLabelWrapperComponent,
    BootstrapDynamicFormValidationComponent
  ],
  exports: [
    DynamicFormsCoreModule
  ],
  entryComponents: [
    BootstrapDynamicFormControlComponent,
    BootstrapDynamicLabelWrapperComponent,
    CheckboxComponent,
    TextboxComponent,
    NumberboxComponent,
    SelectComponent
  ]
})
export class DynamicFormsBootstrapModule {
  static forRoot(config: DynamicFormConfig = defaultConfig): ModuleWithProviders {
    return {
      ngModule: DynamicFormsBootstrapModule,
      providers: [
        {
          provide: DYNAMIC_FORM_CONFIG,
          useValue: config,
          multi: true
        },
        {
          provide: DynamicFormConfigService,
          useFactory: configureFormConfigService,
          deps: [DYNAMIC_FORM_CONFIG]
        },
        DynamicFormBuilder,
        DynamicFormFieldExpressionsBuilder,
        DynamicFormValidationBuilder,
        DynamicFormComponentFactory
      ]
    };
  }
}


