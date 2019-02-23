import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormValidationBuilder } from '@dynamic-forms/core';
import { DynamicFormGroupComponent } from '@dynamic-forms/core';
import { DynamicFormComponentFactory } from '@dynamic-forms/core';
import { DynamicFormsCoreModule } from '@dynamic-forms/core';
import { DynamicFormArrayComponent } from '@dynamic-forms/core';
import { DynamicFormBuilder } from '@dynamic-forms/core';
import { DynamicFormFieldExpressionsBuilder } from '@dynamic-forms/core';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from '@dynamic-forms/core';
import { DynamicFormConfigService } from '@dynamic-forms/core';
import { BootstrapDynamicFormControlComponent } from './dynamic-form-control/dynamic-form-control.component';
import { BootstrapDynamicFormControlModule } from './dynamic-form-control/dynamic-form-control.module';
import { CheckboxComponent } from './dynamic-form-input/checkbox/checkbox.component';
import { DatepickerComponent } from './dynamic-form-input/datepicker/datepicker.component';
import { DropdownComponent } from './dynamic-form-input/dropdown/dropdown.component';
import { BootstrapDynamicFormInputModule } from './dynamic-form-input/dynamic-form-input.module';
import { NumberboxComponent } from './dynamic-form-input/numberbox/numberbox.component';
import { TextboxComponent } from './dynamic-form-input/textbox/textbox.component';
import { BootstrapDynamicFormValidationModule } from './dynamic-form-validation/dynamic-form-validation.module';
import { BootstrapDynamicFormWrapperModule } from './dynamic-form-wrapper/dynamic-form-wrapper.module';
import { BootstrapDynamicLabelWrapperComponent } from './dynamic-form-wrapper/dynamic-label-wrapper.component';

const defaultConfig: DynamicFormConfig = {
  module: 'bootstrap',
  wrapperConfig: {
    types: [
      { type: 'label', component: BootstrapDynamicLabelWrapperComponent }
    ]
  },
  fieldConfig: {
    types: [
      { type: 'group', component: DynamicFormGroupComponent },
      { type: 'array', component: DynamicFormArrayComponent },
      { type: 'control', component: BootstrapDynamicFormControlComponent }
    ]
  },
  inputConfig: {
    types: [
      { type: 'checkbox', component: CheckboxComponent },
      { type: 'datepicker', component: DatepickerComponent, wrappers: [ 'label' ] },
      { type: 'dropdown', component: DropdownComponent, wrappers: [ 'label' ] },
      { type: 'numberbox', component: NumberboxComponent, wrappers: [ 'label' ] },
      { type: 'textbox', component: TextboxComponent, wrappers: [ 'label' ] }
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
    BootstrapDynamicFormControlModule,
    BootstrapDynamicFormInputModule,
    BootstrapDynamicFormValidationModule,
    BootstrapDynamicFormWrapperModule
  ],
  exports: [
    DynamicFormsCoreModule
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


