import { TestBed, inject } from '@angular/core/testing';
import { DynamicFormArrayValidatorType } from '../dynamic-form-array/dynamic-form-array-validator-type';
import {
  DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG,
  DynamicFormArrayValidatorTypeConfig,
} from '../dynamic-form-array/dynamic-form-array-validator-type-config';
import { DynamicFormControlValidatorType } from '../dynamic-form-control/dynamic-form-control-validator-type';
import {
  DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG,
  DynamicFormControlValidatorTypeConfig,
} from '../dynamic-form-control/dynamic-form-control-validator-type-config';
import { DynamicFormDictionaryValidatorType } from '../dynamic-form-dictionary/dynamic-form-dictionary-validator-type';
import {
  DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG,
  DynamicFormDictionaryValidatorTypeConfig,
} from '../dynamic-form-dictionary/dynamic-form-dictionary-validator-type-config';
import { DynamicFormGroupValidatorType } from '../dynamic-form-group/dynamic-form-group-validator-type';
import {
  DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG,
  DynamicFormGroupValidatorTypeConfig,
} from '../dynamic-form-group/dynamic-form-group-validator-type-config';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import {
  DYNAMIC_FORM_VALIDATION_CONFIGS,
  DynamicFormValidationConfig,
  DynamicFormValidationConfigs,
  dynamicFormValidationConfig,
} from '../dynamic-form-validation/dynamic-form-validation-config';
import { importDynamicFormsProviders } from '../dynamic-forms.module';
import { DynamicFormValidationBuilder } from './dynamic-form-validation.builder';
import {
  withDynamicFormArrayValidatorFactory,
  withDynamicFormArrayValidators,
  withDynamicFormControlValidatorFactory,
  withDynamicFormControlValidators,
  withDynamicFormDictionaryValidatorFactory,
  withDynamicFormDictionaryValidators,
  withDynamicFormGroupValidatorFactory,
  withDynamicFormGroupValidators,
  withDynamicFormValidation,
} from './dynamic-form-validation.module';
import { DynamicFormValidationService } from './dynamic-form-validation.service';

class Dependency {}

describe('DynamicFormValidationModule', () => {
  describe('without providers', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({});
    });

    it('does not provide DynamicFormValidationBuilder', () => {
      expect(() => TestBed.inject(DynamicFormValidationBuilder)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DynamicFormValidationService', () => {
      expect(() => TestBed.inject(DynamicFormValidationService)).toThrowError(/NullInjectorError/);
    });
  });

  describe('with DynamicFormLibraryService provided', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' }),
          },
          DynamicFormValidationBuilder,
          DynamicFormValidationService,
        ],
      });
    });

    it('provides DynamicFormValidationBuilder', inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
      expect(service).toBeTruthy();
    }));

    it('provides DynamicFormValidationService', inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
      expect(service).toBeTruthy();
    }));
  });

  describe('withControlValidator', () => {
    const controlValidatorType: DynamicFormControlValidatorType = {
      type: 'validator',
      factory: null,
      libraryName: 'test',
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' }),
          },
          importDynamicFormsProviders(withDynamicFormControlValidators(controlValidatorType)),
        ],
      });
    });

    it('provides DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG', inject(
      [DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG],
      (config: DynamicFormControlValidatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(controlValidatorType);
      },
    ));
  });

  describe('withControlValidators', () => {
    const controlValidatorTypes: DynamicFormControlValidatorType[] = [
      { type: 'validator1', factory: null, libraryName: 'test' },
      { type: 'validator2', factory: null, libraryName: 'test' },
    ];

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' }),
          },
          importDynamicFormsProviders(withDynamicFormControlValidators(...controlValidatorTypes)),
        ],
      });
    });

    it('provides DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG', inject(
      [DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG],
      (config: DynamicFormControlValidatorTypeConfig) => {
        expect(config.length).toBe(2);
        expect(config).toEqual(controlValidatorTypes);
      },
    ));
  });

  describe('withControlValidatorFactory', () => {
    const dependency = {} as Dependency;
    const controlValidatorTypeFactory: (d: Dependency) => DynamicFormControlValidatorType = (d: Dependency) => {
      return {
        type: 'validator',
        factory: null,
        deps: [d],
        libraryName: 'test',
      };
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: Dependency,
            useValue: dependency,
          },
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' }),
          },
          importDynamicFormsProviders(withDynamicFormControlValidatorFactory(controlValidatorTypeFactory, [Dependency])),
        ],
      });
    });

    it('provides DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG', inject(
      [DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG],
      (config: DynamicFormControlValidatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual({
          type: 'validator',
          factory: null,
          deps: [dependency],
          libraryName: 'test',
        });
      },
    ));
  });

  describe('withGroupValidator', () => {
    const groupValidatorType: DynamicFormGroupValidatorType = {
      type: 'validator',
      factory: null,
      libraryName: 'test',
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' }),
          },
          importDynamicFormsProviders(withDynamicFormGroupValidators(groupValidatorType)),
        ],
      });
    });

    it('provides DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG', inject(
      [DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG],
      (config: DynamicFormGroupValidatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(groupValidatorType);
      },
    ));
  });

  describe('withGroupValidators', () => {
    const groupValidatorTypes: DynamicFormGroupValidatorType[] = [
      { type: 'validator1', factory: null, libraryName: 'test' },
      { type: 'validator2', factory: null, libraryName: 'test' },
    ];

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' }),
          },
          importDynamicFormsProviders(withDynamicFormGroupValidators(...groupValidatorTypes)),
        ],
      });
    });

    it('provides DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG', inject(
      [DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG],
      (config: DynamicFormGroupValidatorTypeConfig) => {
        expect(config.length).toBe(2);
        expect(config).toEqual(groupValidatorTypes);
      },
    ));
  });

  describe('withGroupValidatorFactory', () => {
    const dependency = {} as Dependency;
    const groupValidatorTypeFactory: (d: Dependency) => DynamicFormGroupValidatorType = (d: Dependency) => {
      return {
        type: 'validator',
        factory: null,
        deps: [d],
        libraryName: 'test',
      };
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: Dependency,
            useValue: dependency,
          },
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' }),
          },
          importDynamicFormsProviders(withDynamicFormGroupValidatorFactory(groupValidatorTypeFactory, [Dependency])),
        ],
      });
    });

    it('provides DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG', inject(
      [DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG],
      (config: DynamicFormGroupValidatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual({
          type: 'validator',
          factory: null,
          deps: [dependency],
          libraryName: 'test',
        });
      },
    ));
  });

  describe('withArrayValidator', () => {
    const arrayValidatorType: DynamicFormArrayValidatorType = {
      type: 'validator',
      factory: null,
      libraryName: 'test',
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' }),
          },
          importDynamicFormsProviders(withDynamicFormArrayValidators(arrayValidatorType)),
        ],
      });
    });

    it('provides DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG', inject(
      [DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG],
      (config: DynamicFormArrayValidatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(arrayValidatorType);
      },
    ));
  });

  describe('withArrayValidators', () => {
    const arrayValidatorTypes: DynamicFormArrayValidatorType[] = [
      { type: 'validator1', factory: null, libraryName: 'test' },
      { type: 'validator2', factory: null, libraryName: 'test' },
    ];

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' }),
          },
          importDynamicFormsProviders(withDynamicFormArrayValidators(...arrayValidatorTypes)),
        ],
      });
    });

    it('provides DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG', inject(
      [DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG],
      (config: DynamicFormArrayValidatorTypeConfig) => {
        expect(config.length).toBe(2);
        expect(config).toEqual(arrayValidatorTypes);
      },
    ));
  });

  describe('withArrayValidatorFactory', () => {
    const dependency = {} as Dependency;
    const arrayValidatorTypeFactory: (d: Dependency) => DynamicFormArrayValidatorType = (d: Dependency) => {
      return {
        type: 'validator',
        factory: null,
        deps: [d],
        libraryName: 'test',
      };
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: Dependency,
            useValue: dependency,
          },
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' }),
          },
          importDynamicFormsProviders(withDynamicFormArrayValidatorFactory(arrayValidatorTypeFactory, [Dependency])),
        ],
      });
    });

    it('provides DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG', inject(
      [DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG],
      (config: DynamicFormArrayValidatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual({
          type: 'validator',
          factory: null,
          deps: [dependency],
          libraryName: 'test',
        });
      },
    ));
  });

  describe('withDictionaryValidator', () => {
    const dictionaryValidatorType: DynamicFormDictionaryValidatorType = {
      type: 'validator',
      factory: null,
      libraryName: 'test',
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' }),
          },
          importDynamicFormsProviders(withDynamicFormDictionaryValidators(dictionaryValidatorType)),
        ],
      });
    });

    it('provides DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG', inject(
      [DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG],
      (config: DynamicFormDictionaryValidatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(dictionaryValidatorType);
      },
    ));
  });

  describe('withDictionaryValidators', () => {
    const dictionaryValidatorTypes: DynamicFormDictionaryValidatorType[] = [
      { type: 'validator1', factory: null, libraryName: 'test' },
      { type: 'validator2', factory: null, libraryName: 'test' },
    ];

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' }),
          },
          importDynamicFormsProviders(withDynamicFormDictionaryValidators(...dictionaryValidatorTypes)),
        ],
      });
    });

    it('provides DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG', inject(
      [DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG],
      (config: DynamicFormDictionaryValidatorTypeConfig) => {
        expect(config.length).toBe(2);
        expect(config).toEqual(dictionaryValidatorTypes);
      },
    ));
  });

  describe('withDictionaryValidatorFactory', () => {
    const dependency = {} as Dependency;
    const dictionaryValidatorTypeFactory: (d: Dependency) => DynamicFormDictionaryValidatorType = (d: Dependency) => {
      return {
        type: 'validator',
        factory: null,
        deps: [d],
        libraryName: 'test',
      };
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: Dependency,
            useValue: dependency,
          },
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' }),
          },
          importDynamicFormsProviders(withDynamicFormDictionaryValidatorFactory(dictionaryValidatorTypeFactory, [Dependency])),
        ],
      });
    });

    it('provides DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG', inject(
      [DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG],
      (config: DynamicFormArrayValidatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual({
          type: 'validator',
          factory: null,
          deps: [dependency],
          libraryName: 'test',
        });
      },
    ));
  });

  describe('withValidation for default config', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(withDynamicFormValidation()),
      });
    });

    it('provides DYNAMIC_FORM_VALIDATION_CONFIGS', inject([DYNAMIC_FORM_VALIDATION_CONFIGS], (configs: DynamicFormValidationConfigs) => {
      expect(configs.length).toBe(1);
      expect(configs[0]).toEqual(dynamicFormValidationConfig);
    }));
  });

  describe('withValidation for provided config', () => {
    const libraryName = 'test';
    const config: DynamicFormValidationConfig = { defaultMessage: 'message', messages: {}, libraryName };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(withDynamicFormValidation(config)),
      });
    });

    it('provides DYNAMIC_FORM_VALIDATION_CONFIGS', inject([DYNAMIC_FORM_VALIDATION_CONFIGS], (configs: DynamicFormValidationConfigs) => {
      expect(configs.length).toBe(1);
      expect(configs[0]).toEqual(config);
    }));
  });
});
