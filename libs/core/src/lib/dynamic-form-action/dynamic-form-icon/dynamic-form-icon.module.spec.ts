import { TestBed, inject } from '@angular/core/testing';
import { DynamicFormLibraryService } from '../../dynamic-form-library/dynamic-form-library.service';
import { importDynamicFormsProviders } from '../../dynamic-forms.module';
import { DYNAMIC_FORM_ICON_CONFIGS, DynamicFormIconConfig, DynamicFormIconConfigs } from './dynamic-form-icon-config';
import { withDynamicFormIcons } from './dynamic-form-icon.module';
import { DynamicFormIconService } from './dynamic-form-icon.service';

describe('DynamicFormIconModule', () => {
  describe('without providers', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({});
    });

    it('does not provide DynamicFormIconService', () => {
      expect(() => TestBed.inject(DynamicFormIconService)).toThrowError();
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
          DynamicFormIconService,
        ],
      });
    });

    it('provides DynamicFormIconService', inject([DynamicFormIconService], (service: DynamicFormIconService) => {
      expect(service).toBeTruthy();
    }));
  });

  describe('withIcons for provided icon config', () => {
    const libraryName = 'test';
    const config: DynamicFormIconConfig = { icons: {}, libraryName };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' }),
          },
          importDynamicFormsProviders(withDynamicFormIcons(config)),
        ],
      });
    });

    it('provides DYNAMIC_FORM_ICON_CONFIGS', inject([DYNAMIC_FORM_ICON_CONFIGS], (configs: DynamicFormIconConfigs) => {
      expect(configs.length).toBe(1);
      expect(configs[0]).toEqual(config);
    }));
  });
});
