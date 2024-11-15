import { TestBed, inject } from '@angular/core/testing';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { importDynamicFormsProviders } from '../dynamic-forms.module';
import { DYNAMIC_FORM_COLOR_CONFIGS, DynamicFormColorConfig, DynamicFormColorConfigs } from './dynamic-form-color-config';
import { DynamicFormColorService } from './dynamic-form-color.service';
import { withDynamicFormColors } from './dynamic-form-theme.module';

describe('DynamicFormThemeModule', () => {
  describe('without providers', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({});
    });

    it('does not provide DynamicFormColorService', () => {
      expect(() => TestBed.inject(DynamicFormColorService)).toThrowError(/NullInjectorError/);
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
          DynamicFormColorService,
        ],
      });
    });

    it('provides DynamicFormColorService', inject([DynamicFormColorService], (service: DynamicFormColorService) => {
      expect(service).toBeTruthy();
    }));
  });

  describe('withColor for provided color config', () => {
    const libraryName = 'test';
    const config: DynamicFormColorConfig = { colors: {}, libraryName };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' }),
          },
          importDynamicFormsProviders(withDynamicFormColors(config)),
        ],
      });
    });

    it('provides DYNAMIC_FORM_COLOR_CONFIGS', inject([DYNAMIC_FORM_COLOR_CONFIGS], (configs: DynamicFormColorConfigs) => {
      expect(configs.length).toBe(1);
      expect(configs[0]).toEqual(config);
    }));
  });
});
