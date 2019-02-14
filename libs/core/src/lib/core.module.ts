import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormArrayBuilder } from './form-array/form-array.builder';
import { FormArrayComponent } from './form-array/form-array.component';
import { FormControlBuilder } from './form-control/form-control.builder';
import { FormControlComponent } from './form-control/form-control.component';
import { FormControlFactory } from './form-control/form-control.factory';
import { FormFieldComponent } from './form-field/form-field.component';
import { FormFieldFactory } from './form-field/form-field.factory';
import { FormGroupBuilder } from './form-group/form-group.builder';
import { FormGroupComponent } from './form-group/form-group.component';
import { FormValidationBuilder } from './form-validation/form-validation.builder';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { FormBuilder } from './form/form.builder';
import { FormComponent } from './form/form.component';

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
  providers: [
    FormBuilder,
    FormGroupBuilder,
    FormArrayBuilder,
    FormControlBuilder,
    FormFieldFactory,
    FormControlFactory,
    FormValidationBuilder
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
export class DynamicFormsModule {}
