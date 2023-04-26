import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionHandler } from '../dynamic-form-action/dynamic-form-action-handler';
import { DynamicFormActionModule } from '../dynamic-form-action/dynamic-form-action.module';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { DynamicFormElementModule } from '../dynamic-form-element/dynamic-form-element.module';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldModule } from '../dynamic-form-field/dynamic-form-field.module';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormValidationModule } from '../dynamic-form-validation/dynamic-form-validation.module';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormArray } from './dynamic-form-array';
import { dynamicFormArrayFactory } from './dynamic-form-array-factory';
import { dynamicFormArrayValidatorTypes } from './dynamic-form-array-validator-type';
import { DynamicFormArrayComponent } from './dynamic-form-array.component';

export const dynamicFormArrayType: DynamicFormFieldType = {
  type: 'array',
  factory: dynamicFormArrayFactory,
  component: DynamicFormArrayComponent,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormArrayPushFieldHandlerFactory = (formBuilder: DynamicFormBuilder): DynamicFormActionHandler<DynamicFormArray> => {
  const func = (field: DynamicFormArray) => {
    const element = formBuilder.createFormArrayField(field, field.length);
    return field.pushField(element);
  };
  return {
    type: 'pushArrayField',
    func,
    libraryName: dynamicFormLibrary.name,
  };
};

export const dynamicFormArrayPopField = (field: DynamicFormArray): void => field.popField();

export const dynamicFormArrayPopFieldHandler: DynamicFormActionHandler<DynamicFormArray> = {
  type: 'popArrayField',
  func: dynamicFormArrayPopField,
  libraryName: dynamicFormLibrary.name,
};

export const getDynamicFormArray = (action: DynamicFormAction): DynamicFormArray => {
  const field = action.parentField && action.parentField.parentField;
  return field && field.fieldClassType === 'array' ? field as DynamicFormArray : undefined;
};

export const dynamicFormArrayRemoveField = (field: DynamicFormArray, action: DynamicFormAction): void => {
  if (field && action.parentField && action.parentField.index >= 0) {
    field.removeField(action.parentField.index);
  }
};

export const dynamicFormArrayRemoveFieldHandler: DynamicFormActionHandler<DynamicFormArray> = {
  type: 'removeArrayField',
  elementFunc: getDynamicFormArray,
  func: dynamicFormArrayRemoveField,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormArrayClearFields = (field: DynamicFormArray): void => field.clearFields();

export const dynamicFormArrayClearFieldsHandler: DynamicFormActionHandler<DynamicFormArray> = {
  type: 'clearArrayFields',
  func: dynamicFormArrayClearFields,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormArrayMoveFieldDown = (field: DynamicFormArray, action: DynamicFormAction): void => {
  if (field && action.parentField && action.parentField.index >= 0) {
    field.moveFieldDown(action.parentField.index);
  }
};

export const dynamicFormArrayMoveFieldDownHandler: DynamicFormActionHandler<DynamicFormArray> = {
  type: 'moveArrayFieldDown',
  elementFunc: getDynamicFormArray,
  func: dynamicFormArrayMoveFieldDown,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormArrayMoveFieldUp = (field: DynamicFormArray, action: DynamicFormAction): void => {
  if (field && action.parentField && action.parentField.index >= 0) {
    field.moveFieldUp(action.parentField.index);
  }
};

export const dynamicFormArrayMoveFieldUpHandler: DynamicFormActionHandler<DynamicFormArray> = {
  type: 'moveArrayFieldUp',
  elementFunc: getDynamicFormArray,
  func: dynamicFormArrayMoveFieldUp,
  libraryName: dynamicFormLibrary.name,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormElementModule,
    DynamicFormFieldModule,
    DynamicFormConfigModule.withField(dynamicFormArrayType),
    DynamicFormValidationModule.withArrayValidators(dynamicFormArrayValidatorTypes),
    DynamicFormActionModule.withHandlerFactory(dynamicFormArrayPushFieldHandlerFactory, [ DynamicFormBuilder ]),
    DynamicFormActionModule.withHandlers([
      dynamicFormArrayPopFieldHandler,
      dynamicFormArrayRemoveFieldHandler,
      dynamicFormArrayClearFieldsHandler,
      dynamicFormArrayMoveFieldDownHandler,
      dynamicFormArrayMoveFieldUpHandler,
    ]),
  ],
  exports: [
    DynamicFormConfigModule,
    DynamicFormActionModule,
  ],
})
export class DynamicFormArrayModule {}
