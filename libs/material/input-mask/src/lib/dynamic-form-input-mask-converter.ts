import { DynamicFormsFeature } from '@dynamic-forms/core';
import {
  DynamicFormInputMaskConverterType,
  DynamicFormInputMaskDatetimeFormatter,
  dynamicFormInputMaskNumberConverter,
  withDynamicFormInputMaskConverter,
} from '@dynamic-forms/core/input-mask';
import { matDynamicFormLibrary } from '@dynamic-forms/material';
import { MatDynamicFormInputMaskDatetimeConverter } from './dynamic-form-input-mask-datetime-converter';

export const matDynamicFormInputMaskDatetimeConverter: DynamicFormInputMaskConverterType = {
  type: 'datetime',
  aliases: ['datetime'],
  converter: MatDynamicFormInputMaskDatetimeConverter,
  deps: [DynamicFormInputMaskDatetimeFormatter],
  libraryName: matDynamicFormLibrary.name,
};

export const matDynamicFormInputMaskConverters = [dynamicFormInputMaskNumberConverter, matDynamicFormInputMaskDatetimeConverter];

export function withMatDynamicFormInputMaskConverters(): DynamicFormsFeature {
  return withDynamicFormInputMaskConverter(...matDynamicFormInputMaskConverters);
}
