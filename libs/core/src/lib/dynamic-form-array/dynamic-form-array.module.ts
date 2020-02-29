import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormActionHandler } from '../dynamic-form-action/dynamic-form-action-handler';
import { DynamicFormActionModule } from '../dynamic-form-action/dynamic-form-action.module';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { dynamicFormLibrary } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormElementModule } from '../dynamic-form-element/dynamic-form-element.module';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldModule } from '../dynamic-form-field/dynamic-form-field.module';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormArray } from './dynamic-form-array';
import { dynamicFormArrayFactory } from './dynamic-form-array-factory';
import { DynamicFormArrayComponent } from './dynamic-form-array.component';

export const dynamicFormArrayType: DynamicFormFieldType = {
  type: 'array',
  factory: dynamicFormArrayFactory,
  component: DynamicFormArrayComponent,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormArrayPopElementFactory(field: DynamicFormArray) {
  field.popElement();
}

export const dynamicFormArrayPopElementHandler: DynamicFormActionHandler<DynamicFormArray> = {
  type: 'popElement',
  fieldType: 'array',
  func: dynamicFormArrayPopElementFactory,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormArrayClearElementsFactory(field: DynamicFormArray) {
  field.clearElements();
}

export const dynamicFormArrayClearElementsHandler: DynamicFormActionHandler<DynamicFormArray> = {
  type: 'clearElements',
  fieldType: 'array',
  func: dynamicFormArrayClearElementsFactory,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormArrayPushElementHandlerFactory(formBuilder: DynamicFormBuilder): DynamicFormActionHandler<DynamicFormArray> {
  const func = (field: DynamicFormArray) => field.pushElement(formBuilder.createFormArrayElement(field, field.length));
  return {
    type: 'pushElement',
    fieldType: 'array',
    func: func,
    libraryName: dynamicFormLibrary.name
  };
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormElementModule,
    DynamicFormFieldModule,
    DynamicFormConfigModule.withField(dynamicFormArrayType),
    DynamicFormActionModule.withHandler(dynamicFormArrayPopElementHandler),
    DynamicFormActionModule.withHandler(dynamicFormArrayClearElementsHandler),
    DynamicFormActionModule.withHandlerFactory(dynamicFormArrayPushElementHandlerFactory, [ DynamicFormBuilder ])
  ],
  declarations: [
    DynamicFormArrayComponent
  ],
  exports: [
    DynamicFormConfigModule,
    DynamicFormActionModule,
    DynamicFormArrayComponent
  ],
  entryComponents: [
    DynamicFormArrayComponent
  ]
})
export class DynamicFormArrayModule {}
