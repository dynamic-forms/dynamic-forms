import { NgModule } from '@angular/core';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionHandler } from '../dynamic-form-action/dynamic-form-action-handler';
import {
  DynamicFormActionModule,
  withDynamicFormActionHandlerFactory,
  withDynamicFormActionHandlers,
} from '../dynamic-form-action/dynamic-form-action.module';
import { DynamicFormConfigModule, withDynamicFormFields } from '../dynamic-form-config/dynamic-form-config.module';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { withDynamicFormDictionaryValidators } from '../dynamic-form-validation/dynamic-form-validation.module';
import { DynamicFormsFeature } from '../dynamic-forms-feature';
import { importDynamicFormsProviders } from '../dynamic-forms.module';
import { DynamicFormDictionary } from './dynamic-form-dictionary';
import { dynamicFormDictionaryFactory } from './dynamic-form-dictionary-factory';
import { dynamicFormDictionaryValidatorTypes } from './dynamic-form-dictionary-validator-type';
import { DynamicFormDictionaryComponent } from './dynamic-form-dictionary.component';

export const dynamicFormDictionaryType: DynamicFormFieldType = {
  type: 'dictionary',
  factory: dynamicFormDictionaryFactory,
  component: DynamicFormDictionaryComponent,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormDictionaryRegisterFieldHandlerFactory = (
  formBuilder: DynamicFormBuilder,
): DynamicFormActionHandler<DynamicFormDictionary> => {
  const func = (field: DynamicFormDictionary, action: DynamicFormAction) => {
    const parent = action.parent as DynamicFormAction;
    const key = parent.dialog ? parent.dialog.model.key : formBuilder.createId();
    const element = formBuilder.createFormDictionaryField(field, key);
    if (parent.dialog) {
      parent.closeDialog();
    }
    return field.registerField(element);
  };
  return {
    type: 'registerDictionaryField',
    elementFunc: getDynamicFormDictionary,
    func,
    libraryName: dynamicFormLibrary.name,
  };
};

export const getDynamicFormDictionary = (action: DynamicFormAction): DynamicFormDictionary => {
  const field = action.parent as DynamicFormField;
  if (field.fieldClassType === 'dictionary') {
    return field as DynamicFormDictionary;
  }

  const parentField = field.parent as DynamicFormField;
  return parentField && parentField.fieldClassType === 'dictionary' ? (parentField as DynamicFormDictionary) : undefined;
};

export const dynamicFormDictionaryRemoveField = (field: DynamicFormDictionary, action: DynamicFormAction): void => {
  const childField = action.parent as DynamicFormField;
  if (field && childField && childField.key) {
    field.removeField(childField.key);
  }
};

export const dynamicFormDictionaryRemoveFieldHandler: DynamicFormActionHandler<DynamicFormDictionary> = {
  type: 'removeDictionaryField',
  elementFunc: getDynamicFormDictionary,
  func: dynamicFormDictionaryRemoveField,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormDictionaryClearFields = (field: DynamicFormDictionary): void => field.clearFields();

export const dynamicFormDictionaryClearFieldsHandler: DynamicFormActionHandler<DynamicFormDictionary> = {
  type: 'clearDictionaryFields',
  func: dynamicFormDictionaryClearFields,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormDictionaryActionHandlers = [dynamicFormDictionaryRemoveFieldHandler, dynamicFormDictionaryClearFieldsHandler];

export function withDynamicFormDictionaryDefaultFeatures(): DynamicFormsFeature[] {
  return [
    withDynamicFormFields(dynamicFormDictionaryType),
    withDynamicFormDictionaryValidators(...dynamicFormDictionaryValidatorTypes),
    withDynamicFormActionHandlers(...dynamicFormDictionaryActionHandlers),
    withDynamicFormActionHandlerFactory(dynamicFormDictionaryRegisterFieldHandlerFactory, [DynamicFormBuilder]),
  ];
}

const modules = [DynamicFormActionModule, DynamicFormConfigModule];

/**
 * @deprecated Use {@link withDynamicFormDictionaryDefaultFeatures} instead.
 */
@NgModule({
  imports: modules,
  exports: modules,
  providers: importDynamicFormsProviders(...withDynamicFormDictionaryDefaultFeatures()),
})
export class DynamicFormDictionaryModule {}
