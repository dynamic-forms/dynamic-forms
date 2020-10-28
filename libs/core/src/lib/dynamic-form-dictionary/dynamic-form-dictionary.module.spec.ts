import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { dynamicFormDictionaryValidatorTypes } from './dynamic-form-dictionary-validator-type';
import { DynamicFormDictionaryValidatorTypeConfig, DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG } from './dynamic-form-dictionary-validator-type-config';
import { dynamicFormDictionaryType, DynamicFormDictionaryModule } from './dynamic-form-dictionary.module';

describe('DynamicFormDictionaryModule', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormDictionaryModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService(dynamicFormLibrary)
        }
      ]
    });
  }));

  it('provides DYNAMIC_FORM_FIELD_TYPES',
    inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
      const types = service.fieldTypes;

      expect(types.length).toBe(1);
      expect(types[0]).toEqual(dynamicFormDictionaryType);
      expect(types[0].factory).toEqual(jasmine.any(Function));
      expect(types[0].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );

  it('provides DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG',
    inject([DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG], (config: DynamicFormDictionaryValidatorTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(dynamicFormDictionaryValidatorTypes);
    })
  );
});
