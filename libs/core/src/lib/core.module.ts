import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent, FormBuilder } from './form';
import { FormFieldComponent, FormFieldFactory } from './form-field';
import { FormGroupComponent, FormGroupBuilder } from './form-group';
import { FormArrayComponent, FormArrayBuilder } from './form-array';
import { FormControlComponent, FormControlBuilder, FormControlFactory } from './form-control';
import { FormInputComponent } from './form-control/form-input';
import { FormValidationComponent, FormValidationBuilder } from './form-validation';

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
    FormInputComponent,
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
    FormInputComponent
  ]
})
export class DynamicFormsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DynamicFormsModule,
      providers: [
        FormBuilder,
        FormGroupBuilder,
        FormArrayBuilder,
        FormControlBuilder,
        FormValidationBuilder,
        FormFieldFactory,
        FormControlFactory
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
