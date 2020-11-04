import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionHandler } from '../dynamic-form-action/dynamic-form-action-handler';
import { DynamicFormActionModule } from '../dynamic-form-action/dynamic-form-action.module';
import { DynamicFormDialog } from '../dynamic-form-action/dynamic-form-dialog/dynamic-form-dialog';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { DynamicFormElementModule } from '../dynamic-form-element/dynamic-form-element.module';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldModule } from '../dynamic-form-field/dynamic-form-field.module';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormValidationModule } from '../dynamic-form-validation/dynamic-form-validation.module';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormDictionary } from './dynamic-form-dictionary';
import { dynamicFormDictionaryFactory } from './dynamic-form-dictionary-factory';
import { dynamicFormDictionaryValidatorTypes } from './dynamic-form-dictionary-validator-type';
import { DynamicFormDictionaryComponent } from './dynamic-form-dictionary.component';

export const dynamicFormDictionaryType: DynamicFormFieldType = {
  type: 'dictionary',
  factory: dynamicFormDictionaryFactory,
  component: DynamicFormDictionaryComponent,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormDictionaryRegisterFieldHandlerFactory(
  formBuilder: DynamicFormBuilder
): DynamicFormActionHandler<DynamicFormDictionary> {
  const keyFunc = (action: DynamicFormAction) => {
    if (action.parent instanceof DynamicFormDialog) {
      return action.parent.dialog.model.key;
    }
    return formBuilder.createId();
  };
  const func = (field: DynamicFormDictionary, action: DynamicFormAction) => {
    const key = keyFunc(action);
    const element = formBuilder.createFormDictionaryField(field, key);
    return field.registerField(element);
  };
  return {
    type: 'registerDictionaryField',
    elementFunc: getDynamicFormDictionary,
    func: func,
    libraryName: dynamicFormLibrary.name
  };
}

export function getDynamicFormDictionary(action: DynamicFormAction): DynamicFormDictionary {
  const field = <DynamicFormField>action.parent;
  if (field.fieldClassType === 'dictionary') {
    return <DynamicFormDictionary>field;
  }

  const parentField = <DynamicFormField>field.parent;
  return parentField && parentField.fieldClassType === 'dictionary'
    ? <DynamicFormDictionary>parentField
    : undefined;
}

export function dynamicFormDictionaryRemoveField(field: DynamicFormDictionary, action: DynamicFormAction): void {
  const childField = <DynamicFormField>action.parent;
  if (field && childField && childField.key) {
    field.removeField(childField.key);
  }
}

export const dynamicFormDictionaryRemoveFieldHandler: DynamicFormActionHandler<DynamicFormDictionary> = {
  type: 'removeDictionaryField',
  elementFunc: getDynamicFormDictionary,
  func: dynamicFormDictionaryRemoveField,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormDictionaryClearFields(field: DynamicFormDictionary): void {
  field.clearFields();
}

export const dynamicFormDictionaryClearFieldsHandler: DynamicFormActionHandler<DynamicFormDictionary> = {
  type: 'clearDictionaryFields',
  func: dynamicFormDictionaryClearFields,
  libraryName: dynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormElementModule,
    DynamicFormFieldModule,
    DynamicFormConfigModule.withField(dynamicFormDictionaryType),
    DynamicFormValidationModule.withDictionaryValidators(dynamicFormDictionaryValidatorTypes),
    DynamicFormActionModule.withHandlers([
      dynamicFormDictionaryRemoveFieldHandler,
      dynamicFormDictionaryClearFieldsHandler
    ]),
    DynamicFormActionModule.withHandlerFactory(dynamicFormDictionaryRegisterFieldHandlerFactory, [
      DynamicFormBuilder
    ])
  ],
  declarations: [
    DynamicFormDictionaryComponent
  ],
  exports: [
    DynamicFormConfigModule,
    DynamicFormActionModule,
    DynamicFormDictionaryComponent
  ],
  entryComponents: [
    DynamicFormDictionaryComponent
  ]
})
export class DynamicFormDictionaryModule {}
