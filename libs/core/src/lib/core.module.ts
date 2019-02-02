import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FORM_CONFIG, FormConfig, FormComponent, FormBuilder } from './form';
import { FormFieldComponent, FormFieldFactory } from './form-field';
import { FormGroupComponent, FormGroupBuilder } from './form-group';
import { FormArrayComponent, FormArrayBuilder } from './form-array';
import { FormControlComponent, FormControlBuilder, FormControlFactory } from './form-control';
import { FormControlInputComponent } from './form-control-input';
import { FormValidationComponent, FormValidationBuilder } from './form-validation';

export const defaultFormConfig: FormConfig = {
  fieldConfig: {
    types: [
      { type: 'group', component: FormGroupComponent },
      { type: 'array', component: FormArrayComponent },
      { type: 'control', component: FormControlComponent }
    ]
  },
  controlConfig: {
    defaultType: { type: 'input', component: FormControlInputComponent },
    types: [
      { type: 'input', component: FormControlInputComponent }
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
    ReactiveFormsModule
  ],
  declarations: [
    FormComponent,
    FormFieldComponent,
    FormGroupComponent,
    FormArrayComponent,
    FormControlComponent,
    FormControlInputComponent,
    FormValidationComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormComponent
  ],
  entryComponents: [
    FormGroupComponent,
    FormArrayComponent,
    FormControlComponent,
    FormControlInputComponent
  ]
})
export class DynamicFormsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DynamicFormsModule,
      providers: [
        { provide: FORM_CONFIG, useValue: defaultFormConfig },
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

  static forChild(): ModuleWithProviders {
    return {
      ngModule: DynamicFormsModule,
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
