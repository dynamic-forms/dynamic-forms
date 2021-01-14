import { inject, TestBed } from '@angular/core/testing';
import { DynamicFormLibraryService } from '../../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormIconConfig, DynamicFormIconConfigs, DYNAMIC_FORM_ICON_CONFIGS } from './dynamic-form-icon-config';
import { DynamicFormIconModule } from './dynamic-form-icon.module';
import { DynamicFormIconService } from './dynamic-form-icon.service';

describe('DynamicFormIconModule', () => {
  describe('without providers', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormIconModule
        ]
      });
    });

    it('does not provide DynamicFormIconService', () => {
      expect(() => TestBed.inject(DynamicFormIconService)).toThrowError(/NullInjectorError/);
    });
  });

  describe('with DynamicFormLibraryService provided', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormIconModule
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    });

    it('provides DynamicFormIconService',
      inject([DynamicFormIconService], (service: DynamicFormIconService) => {
        expect(service).toBeTruthy();
      })
    );
  });

  describe('withIcons for provided icon config', () => {
    const libraryName = 'test';
    const config: DynamicFormIconConfig = { icons: {}, libraryName };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormIconModule.withIcons(config)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    });

    it('provides DYNAMIC_FORM_ICON_CONFIGS',
      inject([DYNAMIC_FORM_ICON_CONFIGS], (configs: DynamicFormIconConfigs) => {
        expect(configs.length).toBe(1);
        expect(configs[0]).toEqual(config);
      })
    );
  });
});
