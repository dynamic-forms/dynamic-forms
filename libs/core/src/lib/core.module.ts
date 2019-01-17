import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent, FormBuilder } from './form';
import { FormFieldComponent, FormFieldFactory } from './form-field';
import { FormGroupComponent, FormGroupBuilder } from './form-group';
import { FormArrayComponent, FormArrayBuilder } from './form-array';
import { FormControlComponent, FormControlBuilder } from './form-control';
import { FormControlFactory } from './form-control/form-control.factory';
import { FormInputComponent } from './form-input/form-input.component';

@NgModule({
  declarations: [
    FormComponent,
    FormFieldComponent,
    FormGroupComponent,
    FormArrayComponent,
    FormControlComponent,
    FormInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
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
