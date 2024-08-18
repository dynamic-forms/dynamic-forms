import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { DynamicFormLibraryService, DynamicFormsFeature } from '@dynamic-forms/core';
import { DynamicFormInputMaskConverterOptions } from './dynamic-form-input-mask';
import { DynamicFormInputMaskConverter } from './dynamic-form-input-mask-converter';
import {
  DYNAMIC_FORM_INPUT_MASK_CONVERTER_TYPE_CONFIG,
  DynamicFormInputMaskConverterType,
  DynamicFormInputMaskConverterTypeConfig,
} from './dynamic-form-input-mask-converter-type';

@Injectable()
export class DynamicFormInputMaskConverterService {
  readonly converterMap: Map<string, DynamicFormInputMaskConverterType>;
  readonly defaultConverter: DynamicFormInputMaskConverter = { parse: value => value, format: value => value };

  constructor(
    private readonly injector: Injector,
    private readonly libraryService: DynamicFormLibraryService,
    @Optional()
    @Inject(DYNAMIC_FORM_INPUT_MASK_CONVERTER_TYPE_CONFIG)
    private converterConfig: DynamicFormInputMaskConverterTypeConfig,
  ) {
    this.converterMap = this.libraryService.filterTypesMapWithAliases(this.converterConfig);
  }

  getConverter(options: DynamicFormInputMaskConverterOptions): DynamicFormInputMaskConverter {
    if (!options.useConverter || !options.alias) {
      return this.defaultConverter;
    }
    const converterType = this.converterMap.get(options.alias);
    if (!converterType) {
      return this.defaultConverter;
    }
    return this.injector.get(converterType.converter);
  }
}

export function withDynamicFormInputMaskConverterService(): DynamicFormsFeature {
  const provider = { provide: DynamicFormInputMaskConverterService };
  return { providers: [provider] };
}
