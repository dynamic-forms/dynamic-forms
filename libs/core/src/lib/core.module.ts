import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormArrayComponent } from './form-array/form-array.component';
import { FormControlComponent } from './form-control/form-control.component';
import { FormFieldExpressionsBuilder } from './form-field/form-field-expressions.builder';
import { FormFieldComponent } from './form-field/form-field.component';
import { FormGroupComponent } from './form-group/form-group.component';
import { FormValidationBuilder } from './form-validation/form-validation.builder';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { FormComponentFactory } from './form/form-component.factory';
import { FormConfig, FORM_CONFIG } from './form/form-config';
import { FormConfigService } from './form/form-config.service';
import { FormBuilder } from './form/form.builder';
import { FormComponent } from './form/form.component';

export const defaultFormConfig: FormConfig = {
  module: 'core',
  fieldConfig: {
    types: [
      { type: 'group', component: FormGroupComponent },
      { type: 'array', component: FormArrayComponent },
      { type: 'control', component: FormControlComponent }
    ]
  },
  controlConfig: {
    types: [],
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

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    FormComponent,
    FormFieldComponent,
    FormGroupComponent,
    FormArrayComponent,
    FormControlComponent,
    FormValidationComponent
  ],
  exports: [
    FormComponent,
    FormFieldComponent,
    FormGroupComponent,
    FormArrayComponent,
    FormControlComponent,
    FormValidationComponent
  ],
  entryComponents: [
    FormGroupComponent,
    FormArrayComponent,
    FormControlComponent
  ]
})
export class DynamicFormsCoreModule {
  static forRoot(formConfig: FormConfig = defaultFormConfig): ModuleWithProviders {
    return {
      ngModule: DynamicFormsCoreModule,
      providers: [
        {
          provide: FORM_CONFIG,
          useValue: formConfig,
          multi: true
        },
        FormConfigService,
        FormBuilder,
        FormFieldExpressionsBuilder,
        FormValidationBuilder,
        FormComponentFactory
      ]
    };
  }
}
