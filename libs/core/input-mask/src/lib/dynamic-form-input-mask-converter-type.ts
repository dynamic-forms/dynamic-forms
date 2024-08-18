import { InjectionToken, Provider, Type } from '@angular/core';
import { DynamicFormLibraryName, DynamicFormsFeature, dynamicFormLibrary } from '@dynamic-forms/core';
import { DynamicFormInputMaskConverter } from './dynamic-form-input-mask-converter';
import { DynamicFormInputMaskNativeDatetimeConverter } from './dynamic-form-input-mask-datetime-converter';
import { DynamicFormInputMaskDatetimeFormatter } from './dynamic-form-input-mask-datetime-formatter';
import { DynamicFormInputMaskNumberConverter } from './dynamic-form-input-mask-number-converter';

export interface DynamicFormInputMaskConverterType<
  TValue = any,
  TOptions = any,
  Converter extends DynamicFormInputMaskConverter<TValue, TOptions> = DynamicFormInputMaskConverter<TValue, TOptions>,
> {
  type: string;
  aliases?: string[];
  converter: Type<Converter>;
  deps?: any[];
  libraryName: DynamicFormLibraryName;
}

export type DynamicFormInputMaskConverterTypeConfig = (DynamicFormInputMaskConverterType | DynamicFormInputMaskConverterType[])[];

export const DYNAMIC_FORM_INPUT_MASK_CONVERTER_TYPE_CONFIG = new InjectionToken<DynamicFormInputMaskConverterTypeConfig>(
  'DynamicFormInputMaskConverterConfig',
);

export function withDynamicFormInputMaskConverter(...converterTypes: DynamicFormInputMaskConverterType[]): DynamicFormsFeature {
  const providers = converterTypes.reduce(
    (result, converterType) =>
      result.concat([
        {
          provide: DYNAMIC_FORM_INPUT_MASK_CONVERTER_TYPE_CONFIG,
          useValue: converterType,
          multi: true,
        },
        converterType.converter,
        ...(converterType.deps || []),
      ]),
    [] as Provider[],
  );
  return { providers };
}

export const dynamicFormInputMaskDatetimeConverter: DynamicFormInputMaskConverterType = {
  type: 'datetime',
  converter: DynamicFormInputMaskNativeDatetimeConverter,
  deps: [DynamicFormInputMaskDatetimeFormatter],
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormInputMaskNumberConverter: DynamicFormInputMaskConverterType = {
  type: 'number',
  aliases: ['numeric', 'decimal', 'integer', 'currency', 'percentage'],
  converter: DynamicFormInputMaskNumberConverter,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormInputMaskDefaultConverters = [dynamicFormInputMaskDatetimeConverter, dynamicFormInputMaskNumberConverter];

export function withDynamicFormInputMaskDefaultConverters(): DynamicFormsFeature {
  return withDynamicFormInputMaskConverter(...dynamicFormInputMaskDefaultConverters);
}
