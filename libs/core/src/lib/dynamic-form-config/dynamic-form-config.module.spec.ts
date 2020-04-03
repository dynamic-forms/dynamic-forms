import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormActionConfig, DynamicFormActionType,
  DYNAMIC_FORM_ACTION_CONFIG } from '../dynamic-form-action/dynamic-form-action-type';
import { DynamicFormElementConfig, DynamicFormElementType,
  DYNAMIC_FORM_ELEMENT_CONFIG } from '../dynamic-form-element/dynamic-form-element-type';
import { DynamicFormFieldConfig, DynamicFormFieldType,
  DYNAMIC_FORM_FIELD_CONFIG } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldWrapperConfig, DynamicFormFieldWrapperType,
  DYNAMIC_FORM_FIELD_WRAPPER_CONFIG } from '../dynamic-form-field/dynamic-form-field-wrapper-type';
import { DynamicFormInputConfig, DynamicFormInputType,
  DYNAMIC_FORM_INPUT_CONFIG } from '../dynamic-form-input/dynamic-form-input-type';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormConfigModule } from './dynamic-form-config.module';
import { DynamicFormConfigService } from './dynamic-form-config.service';

describe('DynamicFormConfigModule', () => {
  describe('without providers', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule
        ]
      });
    }));

    it('does not provide DynamicFormConfigService', () => {
      expect(() => TestBed.get(DynamicFormConfigService)).toThrowError(/StaticInjectorError/);
    });
  });

  describe('with DynamicFormLibraryService provided', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DynamicFormConfigService',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(service).toBeDefined();
      })
    );
  });

  describe('withElement', () => {
    const libraryName = 'test';
    const type: DynamicFormElementType = { type: 'elementType', component: null, libraryName };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.withElement(type)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DYNAMIC_FORM_ELEMENT_CONFIG',
      inject([DYNAMIC_FORM_ELEMENT_CONFIG], (config: DynamicFormElementConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(type);
      })
    );
  });

  describe('withElements', () => {
    const libraryName = 'test';
    const types: DynamicFormElementType[] = [
      { type: 'elementType1', component: null, libraryName },
      { type: 'elementType2', component: null, libraryName },
    ];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.withElements(types)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DYNAMIC_FORM_ELEMENT_CONFIG',
      inject([DYNAMIC_FORM_ELEMENT_CONFIG], (config: DynamicFormElementConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(types);
      })
    );
  });

  describe('withField', () => {
    const libraryName = 'test';
    const type: DynamicFormFieldType = { type: 'fieldType', factory: null, component: null, libraryName };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.withField(type)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DYNAMIC_FORM_FIELD_CONFIG',
      inject([DYNAMIC_FORM_FIELD_CONFIG], (config: DynamicFormFieldConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(type);
      })
    );
  });

  describe('withFields', () => {
    const libraryName = 'test';
    const types: DynamicFormFieldType[] = [
      { type: 'fieldType1', factory: null, component: null, libraryName },
      { type: 'fieldType2', factory: null, component: null, libraryName }
    ];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.withFields(types)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DYNAMIC_FORM_FIELD_CONFIG',
      inject([DYNAMIC_FORM_FIELD_CONFIG], (config: DynamicFormFieldConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(types);
      })
    );
  });

  describe('withAction', () => {
    const libraryName = 'test';
    const type: DynamicFormActionType = { type: 'actionType', component: null, libraryName };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.withAction(type)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DYNAMIC_FORM_ACTION_CONFIG',
      inject([DYNAMIC_FORM_ACTION_CONFIG], (config: DynamicFormActionConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(type);
      })
    );
  });

  describe('withActions', () => {
    const libraryName = 'test';
    const types: DynamicFormActionType[] = [
      { type: 'actionType1', component: null, libraryName },
      { type: 'actionType2', component: null, libraryName }
    ];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.withActions(types)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DYNAMIC_FORM_ACTION_CONFIG',
      inject([DYNAMIC_FORM_ACTION_CONFIG], (config: DynamicFormActionConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(types);
      })
    );
  });

  describe('withInput', () => {
    const libraryName = 'test';
    const type: DynamicFormInputType = { type: 'inputType', component: null, libraryName };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.withInput(type)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DYNAMIC_FORM_INPUT_CONFIG',
      inject([DYNAMIC_FORM_INPUT_CONFIG], (config: DynamicFormInputConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(type);
      })
    );
  });

  describe('withInputs', () => {
    const libraryName = 'test';
    const types: DynamicFormInputType[] = [
      { type: 'inputType', component: null, libraryName },
      { type: 'inputType', component: null, libraryName }
    ];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.withInputs(types)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DYNAMIC_FORM_INPUT_CONFIG',
      inject([DYNAMIC_FORM_INPUT_CONFIG], (config: DynamicFormInputConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(types);
      })
    );
  });

  describe('withFieldWrapper', () => {
    const libraryName = 'test';
    const type: DynamicFormFieldWrapperType = { type: 'fieldWrapperType', component: null, libraryName };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.withFieldWrapper(type)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DYNAMIC_FORM_FIELD_WRAPPER_CONFIG',
      inject([DYNAMIC_FORM_FIELD_WRAPPER_CONFIG], (config: DynamicFormFieldWrapperConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(type);
      })
    );
  });

  describe('withFieldWrappers', () => {
    const libraryName = 'test';
    const types: DynamicFormFieldWrapperType[] = [
      { type: 'fieldWrapperType', component: null, libraryName },
      { type: 'fieldWrapperType', component: null, libraryName }
    ];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.withFieldWrappers(types)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DYNAMIC_FORM_FIELD_WRAPPER_CONFIG',
      inject([DYNAMIC_FORM_FIELD_WRAPPER_CONFIG], (config: DynamicFormFieldWrapperConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(types);
      })
    );
  });
});
