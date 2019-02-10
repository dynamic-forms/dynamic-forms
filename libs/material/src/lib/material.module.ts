import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsCoreModule } from '@dynamic-forms/core';
import { FormArrayBuilder } from '@dynamic-forms/core/form-array/form-array.builder';
import { FormArrayComponent } from '@dynamic-forms/core/form-array/form-array.component';
import { FormControlBuilder } from '@dynamic-forms/core/form-control/form-control.builder';
import { FormControlComponent } from '@dynamic-forms/core/form-control/form-control.component';
import { FormControlFactory } from '@dynamic-forms/core/form-control/form-control.factory';
import { FormFieldFactory } from '@dynamic-forms/core/form-field/form-field.factory';
import { FormGroupBuilder } from '@dynamic-forms/core/form-group/form-group.builder';
import { FormGroupComponent } from '@dynamic-forms/core/form-group/form-group.component';
import { FormValidationBuilder } from '@dynamic-forms/core/form-validation/form-validation.builder';
import { FormConfig, FORM_CONFIG } from '@dynamic-forms/core/form/form-config';
import { FormComponent } from '@dynamic-forms/core/form/form.component';
import { CheckboxComponent } from './form-control/checkbox/checkbox.component';
import { CheckboxModule } from './form-control/checkbox/checkbox.module';
import { TextboxComponent } from './form-control/textbox/textbox.component';
import { TextboxModule } from './form-control/textbox/textbox.module';

export const defaultFormConfig: FormConfig = {
  fieldConfig: {
    types: [
      { type: 'group', component: FormGroupComponent },
      { type: 'array', component: FormArrayComponent },
      { type: 'control', component: FormControlComponent }
    ]
  },
  controlConfig: {
    defaultType: { type: 'text', component: TextboxComponent },
    types: [
      { type: 'text', component: TextboxComponent },
      { type: 'email', component: TextboxComponent },
      { type: 'password', component: TextboxComponent }
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

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsCoreModule,
    CheckboxModule,
    TextboxModule
  ],
  exports: [
    FormComponent
  ],
  entryComponents: [
    TextboxComponent,
    CheckboxComponent
  ]
})
export class DynamicFormsMaterialModule {
  static forRoot(formConfig: FormConfig = defaultFormConfig): ModuleWithProviders {
    return {
      ngModule: DynamicFormsMaterialModule,
      providers: [
        {
          provide: FORM_CONFIG,
          useValue: formConfig
        },
        FormBuilder,
        FormGroupBuilder,
        FormArrayBuilder,
        FormControlBuilder,
        FormFieldFactory,
        FormControlFactory,
        FormValidationBuilder
      ]
    };
  }

  static forChild(formConfig: FormConfig = {}): ModuleWithProviders {
    console.log('forChild', formConfig);
    return {
      ngModule: DynamicFormsMaterialModule,
      providers: [
        FormBuilder,
        FormGroupBuilder,
        FormArrayBuilder,
        FormControlBuilder,
        FormFieldFactory,
        FormControlFactory
      ]
    };
  }
}


