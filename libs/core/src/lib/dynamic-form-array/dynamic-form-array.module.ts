import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionHandler } from '../dynamic-form-action/dynamic-form-action-handler';
import { DynamicFormActionModule } from '../dynamic-form-action/dynamic-form-action.module';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { DynamicFormElementModule } from '../dynamic-form-element/dynamic-form-element.module';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
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

export function getDynamicFormArray(action: DynamicFormAction): DynamicFormArray {
  const field = action.parent && (<DynamicFormField>action.parent).parent;
  return field && field.fieldClassType === 'array'
    ? <DynamicFormArray>field
    : undefined;
}

export function dynamicFormArrayRemoveElementFactory(field: DynamicFormArray, action: DynamicFormAction): void {
  const parentField = <DynamicFormField>action.parent;
  if (field && parentField && parentField.index >= 0) {
    field.removeElement(parentField.index);
  }
}

export const dynamicFormArrayRemoveElementHandler: DynamicFormActionHandler<DynamicFormArray> = {
  type: 'removeArrayElement',
  elementFunc: getDynamicFormArray,
  func: dynamicFormArrayRemoveElementFactory,
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
    DynamicFormActionModule.withHandlers([
      dynamicFormArrayPopElementHandler,
      dynamicFormArrayRemoveElementHandler,
      dynamicFormArrayClearElementsHandler
    ]),
    DynamicFormActionModule.withHandlerFactory(dynamicFormArrayPushElementHandlerFactory, [ DynamicFormBuilder ]),
    DynamicFormValidationModule.withArrayValidators(dynamicFormArrayValidatorTypes)
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
