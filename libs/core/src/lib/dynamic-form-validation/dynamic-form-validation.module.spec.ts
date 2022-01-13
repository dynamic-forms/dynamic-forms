import { inject, TestBed } from '@angular/core/testing';
import { DynamicFormArrayValidatorType } from '../dynamic-form-array/dynamic-form-array-validator-type';
import { DynamicFormArrayValidatorTypeConfig,
  DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-array/dynamic-form-array-validator-type-config';
import { DynamicFormControlValidatorType } from '../dynamic-form-control/dynamic-form-control-validator-type';
import { DynamicFormControlValidatorTypeConfig,
  DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-control/dynamic-form-control-validator-type-config';
import { DynamicFormDictionaryValidatorType } from '../dynamic-form-dictionary/dynamic-form-dictionary-validator-type';
import { DynamicFormDictionaryValidatorTypeConfig,
  DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-dictionary/dynamic-form-dictionary-validator-type-config';
import { DynamicFormGroupValidatorType } from '../dynamic-form-group/dynamic-form-group-validator-type';
import { DynamicFormGroupValidatorTypeConfig,
  DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-group/dynamic-form-group-validator-type-config';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { dynamicFormValidationConfig, DynamicFormValidationConfig, DynamicFormValidationConfigs,
  DYNAMIC_FORM_VALIDATION_CONFIGS } from '../dynamic-form-validation/dynamic-form-validation-config';
import { DynamicFormValidationBuilder } from './dynamic-form-validation.builder';
import { DynamicFormValidationModule } from './dynamic-form-validation.module';
import { DynamicFormValidationService } from './dynamic-form-validation.service';

class Dependency {}

describe('DynamicFormValidationModule', () => {
  describe('without providers', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormValidationModule
        ]
      });
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
        imports: [
          DynamicFormValidationModule
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    });

    it('provides DynamicFormValidationBuilder',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        expect(service).toBeTruthy();
      })
    );

    it('provides DynamicFormValidationService',
      inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
        expect(service).toBeTruthy();
      })
    );
  });

  describe('withControlValidator', () => {
    const controlValidatorType: DynamicFormControlValidatorType = {
      type: 'validator',
      factory: null,
      libraryName: 'test'
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormValidationModule.withControlValidator(controlValidatorType)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    });

    it('provides DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG',
      inject([DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG], (config: DynamicFormControlValidatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(controlValidatorType);
      })
    );
  });

  describe('withControlValidators', () => {
    const controlValidatorTypes: DynamicFormControlValidatorType[] = [
      { type: 'validator1', factory: null, libraryName: 'test' },
      { type: 'validator2', factory: null, libraryName: 'test' },
    ];

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormValidationModule.withControlValidators(controlValidatorTypes)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    });

    it('provides DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG',
      inject([DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG], (config: DynamicFormControlValidatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(controlValidatorTypes);
      })
    );
  });

  describe('withControlValidatorFactory', () => {
    const dependency = {} as Dependency;
    const controlValidatorTypeFactory: (d: Dependency) => DynamicFormControlValidatorType = (d: Dependency) => {
      return {
        type: 'validator',
        factory: null,
        deps: [ d ],
        libraryName: 'test'
      };
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormValidationModule.withControlValidatorFactory(controlValidatorTypeFactory, [ Dependency ])
        ],
        providers: [
          {
            provide: Dependency,
            useValue: dependency
          },
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    });

    it('provides DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG',
      inject([DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG], (config: DynamicFormControlValidatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual({
          type: 'validator',
          factory: null,
          deps: [ dependency ],
          libraryName: 'test'
        });
      })
    );
  });

  describe('withGroupValidator', () => {
    const groupValidatorType: DynamicFormGroupValidatorType = {
      type: 'validator',
      factory: null,
      libraryName: 'test'
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormValidationModule.withGroupValidator(groupValidatorType)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    });

    it('provides DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG',
      inject([DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG], (config: DynamicFormGroupValidatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(groupValidatorType);
      })
    );
  });

  describe('withGroupValidators', () => {
    const groupValidatorTypes: DynamicFormGroupValidatorType[] = [
      { type: 'validator1', factory: null, libraryName: 'test' },
      { type: 'validator2', factory: null, libraryName: 'test' },
    ];

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormValidationModule.withGroupValidators(groupValidatorTypes)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    });

    it('provides DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG',
      inject([DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG], (config: DynamicFormGroupValidatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(groupValidatorTypes);
      })
    );
  });

  describe('withGroupValidatorFactory', () => {
    const dependency = {} as Dependency;
    const groupValidatorTypeFactory: (d: Dependency) => DynamicFormGroupValidatorType = (d: Dependency) => {
      return {
        type: 'validator',
        factory: null,
        deps: [ d ],
        libraryName: 'test'
      };
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormValidationModule.withGroupValidatorFactory(groupValidatorTypeFactory, [ Dependency ])
        ],
        providers: [
          {
            provide: Dependency,
            useValue: dependency
          },
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    });

    it('provides DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG',
      inject([DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG], (config: DynamicFormGroupValidatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual({
          type: 'validator',
          factory: null,
          deps: [ dependency ],
          libraryName: 'test'
        });
      })
    );
  });

  describe('withArrayValidator', () => {
    const arrayValidatorType: DynamicFormArrayValidatorType = {
      type: 'validator',
      factory: null,
      libraryName: 'test'
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormValidationModule.withArrayValidator(arrayValidatorType)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    });

    it('provides DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG',
      inject([DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG], (config: DynamicFormArrayValidatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(arrayValidatorType);
      })
    );
  });

  describe('withArrayValidators', () => {
    const arrayValidatorTypes: DynamicFormArrayValidatorType[] = [
      { type: 'validator1', factory: null, libraryName: 'test' },
      { type: 'validator2', factory: null, libraryName: 'test' },
    ];

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormValidationModule.withArrayValidators(arrayValidatorTypes)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    });

    it('provides DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG',
      inject([DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG], (config: DynamicFormArrayValidatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(arrayValidatorTypes);
      })
    );
  });

  describe('withArrayValidatorFactory', () => {
    const dependency = {} as Dependency;
    const arrayValidatorTypeFactory: (d: Dependency) => DynamicFormArrayValidatorType = (d: Dependency) => {
      return {
        type: 'validator',
        factory: null,
        deps: [ d ],
        libraryName: 'test'
      };
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormValidationModule.withArrayValidatorFactory(arrayValidatorTypeFactory, [ Dependency ])
        ],
        providers: [
          {
            provide: Dependency,
            useValue: dependency
          },
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    });

    it('provides DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG',
      inject([DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG], (config: DynamicFormArrayValidatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual({
          type: 'validator',
          factory: null,
          deps: [ dependency ],
          libraryName: 'test'
        });
      })
    );
  });

  describe('withDictionaryValidator', () => {
    const dictionaryValidatorType: DynamicFormDictionaryValidatorType = {
      type: 'validator',
      factory: null,
      libraryName: 'test'
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormValidationModule.withDictionaryValidator(dictionaryValidatorType)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    });

    it('provides DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG',
      inject([DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG], (config: DynamicFormDictionaryValidatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(dictionaryValidatorType);
      })
    );
  });

  describe('withDictionaryValidators', () => {
    const dictionaryValidatorTypes: DynamicFormDictionaryValidatorType[] = [
      { type: 'validator1', factory: null, libraryName: 'test' },
      { type: 'validator2', factory: null, libraryName: 'test' },
    ];

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormValidationModule.withDictionaryValidators(dictionaryValidatorTypes)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    });

    it('provides DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG',
      inject([DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG], (config: DynamicFormDictionaryValidatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(dictionaryValidatorTypes);
      })
    );
  });

  describe('withDictionaryValidatorFactory', () => {
    const dependency = {} as Dependency;
    const dictionaryValidatorTypeFactory: (d: Dependency) => DynamicFormDictionaryValidatorType = (d: Dependency) => {
      return {
        type: 'validator',
        factory: null,
        deps: [ d ],
        libraryName: 'test'
      };
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormValidationModule.withDictionaryValidatorFactory(dictionaryValidatorTypeFactory, [ Dependency ])
        ],
        providers: [
          {
            provide: Dependency,
            useValue: dependency
          },
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    });

    it('provides DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG',
      inject([DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG], (config: DynamicFormArrayValidatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual({
          type: 'validator',
          factory: null,
          deps: [ dependency ],
          libraryName: 'test'
        });
      })
    );
  });

  describe('withValidation for default config', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormValidationModule.withValidation()
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    });

    it('provides DYNAMIC_FORM_VALIDATION_CONFIGS',
      inject([DYNAMIC_FORM_VALIDATION_CONFIGS], (configs: DynamicFormValidationConfigs) => {
        expect(configs.length).toBe(1);
        expect(configs[0]).toEqual(dynamicFormValidationConfig);
      })
    );
  });

  describe('withValidation for provided config', () => {
    const libraryName = 'test';
    const config: DynamicFormValidationConfig = { defaultMessage: 'message', messages: {}, libraryName };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormValidationModule.withValidation(config)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    });

    it('provides DYNAMIC_FORM_VALIDATION_CONFIGS',
      inject([DYNAMIC_FORM_VALIDATION_CONFIGS], (configs: DynamicFormValidationConfigs) => {
        expect(configs.length).toBe(1);
        expect(configs[0]).toEqual(config);
      })
    );
  });
});
