import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormActionHandler } from '../dynamic-form-action/dynamic-form-action-handler';
import { DynamicFormActionModule } from '../dynamic-form-action/dynamic-form-action.module';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { DynamicFormElementModule } from '../dynamic-form-element/dynamic-form-element.module';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldModule } from '../dynamic-form-field/dynamic-form-field.module';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
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

export function dynamicFormArrayPopElementFactory(field: DynamicFormArray): void {
  field.popElement();
}

export const dynamicFormArrayPopElementHandler: DynamicFormActionHandler<DynamicFormArray> = {
  type: 'popArrayElement',
  func: dynamicFormArrayPopElementFactory,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormArrayClearElementsFactory(field: DynamicFormArray): void {
  field.clearElements();
}

export const dynamicFormArrayClearElementsHandler: DynamicFormActionHandler<DynamicFormArray> = {
  type: 'clearArrayElements',
  func: dynamicFormArrayClearElementsFactory,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormArrayPushElementHandlerFactory(formBuilder: DynamicFormBuilder): DynamicFormActionHandler<DynamicFormArray> {
  const func = (field: DynamicFormArray) => field.pushElement(formBuilder.createFormArrayElement(field, field.length));
  return {
    type: 'pushArrayElement',
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
  ]
})
export class DynamicFormArrayModule {}
