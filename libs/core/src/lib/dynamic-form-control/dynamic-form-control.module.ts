import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormClassFactory } from '../dynamic-form-config/dynamic-form-class-factory';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { dynamicFormLibrary } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlComponent } from './dynamic-form-control.component';

export const dynamicFormControlFactory: DynamicFormClassFactory<DynamicFormControlDefinition, DynamicFormControl> =
  (builder, root, parent, definition) => builder.createFormControl(root, parent, definition);

export const dynamicFormControlType: DynamicFormFieldType<DynamicFormControlDefinition, DynamicFormControl> = {
  type: 'control',
  factory: dynamicFormControlFactory,
  component: DynamicFormControlComponent,
  libraryName: dynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withField(dynamicFormControlType)
  ],
  declarations: [
    DynamicFormControlComponent
  ],
  exports: [
    DynamicFormConfigModule,
    DynamicFormControlComponent
  ],
  entryComponents: [
    DynamicFormControlComponent
  ]
})
export class DynamicFormControlModule {}
