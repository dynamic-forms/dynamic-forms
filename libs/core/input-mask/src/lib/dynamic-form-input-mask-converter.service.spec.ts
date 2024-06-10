import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { dynamicFormLibrary, provideDynamicForms } from '@dynamic-forms/core';
import { withDynamicFormInputMaskDefaultConverters } from './dynamic-form-input-mask-converter-type';
import {
  DynamicFormInputMaskConverterService,
  withDynamicFormInputMaskConverterService,
} from './dynamic-form-input-mask-converter.service';
import { DynamicFormInputMaskNativeDatetimeConverter } from './dynamic-form-input-mask-datetime-converter';
import { DynamicFormInputMaskNumberConverter } from './dynamic-form-input-mask-number-converter';

describe('DynamicFormInputMaskConverterService', () => {
  let service: DynamicFormInputMaskConverterService;

  describe('without converters', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideDynamicForms(dynamicFormLibrary, withDynamicFormInputMaskConverterService())],
      });
      service = TestBed.inject(DynamicFormInputMaskConverterService);
    });

    describe('converterMap', () => {
      it('is empty', () => {
        expect(service.converterMap.size).toBe(0);
      });
    });

    describe('defaultConverter', () => {
      it('is defined', () => {
        expect(service.defaultConverter).toBeDefined();
      });

      it('parses and formats value without conversion', () => {
        expect(service.defaultConverter.parse('value')).toBe('value');
        expect(service.defaultConverter.format('value')).toBe('value');
      });
    });

    describe('getConverter', () => {
      it('returns defaultConverter if useConverter is false', () => {
        expect(service.getConverter({ useConverter: false })).toBe(service.defaultConverter);
      });

      it('returns defaultConverter if alias is undefined', () => {
        expect(service.getConverter({ useConverter: true })).toBe(service.defaultConverter);
      });

      it('returns defaultConverter if converter for alias was not found', () => {
        expect(service.getConverter({ alias: 'datetime', useConverter: true })).toBe(service.defaultConverter);
      });
    });
  });

  describe('with converters', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          provideDynamicForms(dynamicFormLibrary, withDynamicFormInputMaskConverterService(), withDynamicFormInputMaskDefaultConverters()),
        ],
      });
      service = TestBed.inject(DynamicFormInputMaskConverterService);
    });

    describe('converterMap', () => {
      it('is not empty', () => {
        expect(service.converterMap.size).toBe(7);
        expect([...service.converterMap.keys()]).toEqual(['datetime', 'number', 'numeric', 'decimal', 'integer', 'currency', 'percentage']);
      });
    });

    describe('getConverter', () => {
      let injector: Injector;

      beforeEach(() => {
        injector = TestBed.inject(Injector);
        spyOn(injector, 'get').and.callThrough();
      });

      it('returns defaultConverter if useConverter is false', () => {
        expect(service.getConverter({ useConverter: false })).toBe(service.defaultConverter);
      });

      it('returns defaultConverter if alias is undefined', () => {
        expect(service.getConverter({ useConverter: true })).toBe(service.defaultConverter);
      });

      const datetimeConverterAliases = ['datetime'];

      datetimeConverterAliases.forEach(alias => {
        it(`returns DynamicFormInputMaskNativeDatetimeConverter for alias ${alias}`, () => {
          expect(service.getConverter({ alias, useConverter: true })).toBeInstanceOf(DynamicFormInputMaskNativeDatetimeConverter);
          expect(injector.get).toHaveBeenCalledWith(DynamicFormInputMaskNativeDatetimeConverter);
        });
      });

      const numberConverterAliases = ['number', 'numeric', 'decimal', 'integer', 'currency', 'percentage'];

      numberConverterAliases.forEach(alias => {
        it(`returns DynamicFormInputMaskNativeDatetimeConverter for alias ${alias}`, () => {
          expect(service.getConverter({ alias, useConverter: true })).toBeInstanceOf(DynamicFormInputMaskNumberConverter);
          expect(injector.get).toHaveBeenCalledWith(DynamicFormInputMaskNumberConverter);
        });
      });
    });
  });
});
