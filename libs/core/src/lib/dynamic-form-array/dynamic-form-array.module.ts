import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormActionHandler } from '../dynamic-form-action/dynamic-form-action-handler';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { dynamicFormLibrary } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormElementModule } from '../dynamic-form-element/dynamic-form-element.module';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldModule } from '../dynamic-form-field/dynamic-form-field.module';
import { DynamicFormArray } from './dynamic-form-array';
import { dynamicFormArrayFactory } from './dynamic-form-array-factory';
import { DynamicFormArrayComponent } from './dynamic-form-array.component';

export const dynamicFormArrayType: DynamicFormFieldType = {
  type: 'array',
  factory: dynamicFormArrayFactory,
  component: DynamicFormArrayComponent,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormArrayPopElementHandler: DynamicFormActionHandler<DynamicFormArray> = {
  type: 'popElement',
  func: (field, _action) => field.popElement(),
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormArrayClearElementsHandler: DynamicFormActionHandler<DynamicFormArray> = {
  type: 'clearElements',
  func: (field, _action) => field.clearElements(),
  libraryName: dynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormElementModule,
    DynamicFormFieldModule,
    DynamicFormConfigModule.withField(dynamicFormArrayType),
    DynamicFormConfigModule.withActionHandler(dynamicFormArrayPopElementHandler),
    DynamicFormConfigModule.withActionHandler(dynamicFormArrayClearElementsHandler),
  ],
  declarations: [
    DynamicFormArrayComponent
  ],
  exports: [
    DynamicFormConfigModule,
    DynamicFormArrayComponent
  ],
  entryComponents: [
    DynamicFormArrayComponent
  ]
})
export class DynamicFormArrayModule {}
