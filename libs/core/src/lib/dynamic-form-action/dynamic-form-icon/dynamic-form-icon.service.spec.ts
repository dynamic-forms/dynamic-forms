import { inject, waitForAsync, TestBed } from '@angular/core/testing';
import { DynamicFormLibraryService } from '../../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormIconConfig, DynamicFormIconConfigs,
  DYNAMIC_FORM_ICON_CONFIGS } from './dynamic-form-icon-config';
import { DynamicFormIconTemplate } from './dynamic-form-icon-template';
import { DynamicFormIconService } from './dynamic-form-icon.service';

describe('DynamicFormIconService', () => {
  describe('without inco config', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          },
          DynamicFormIconService
        ]
      });
    }));

    it('returns icon config being empty',
      inject([DynamicFormIconService], (service: DynamicFormIconService) => {
        expect(service.iconConfig).toEqual({
          icons: {},
          libraryName: 'test'
        });
      })
    );

    it('returns icon',
      inject([DynamicFormIconService], (service: DynamicFormIconService) => {
        const template = <DynamicFormIconTemplate>{ icon: 'required' };
        const icon = service.getIcon(template);

        expect(icon).toBe('required');
      })
    );
  });

  describe('with icon config', () => {
    const iconConfig: DynamicFormIconConfig = {
      icons: {
        required: 'icon-required'
      },
      libraryName: 'test'
    };

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          },
          {
            provide: DYNAMIC_FORM_ICON_CONFIGS,
            useValue: [ iconConfig ]
          },
          DynamicFormIconService
        ]
      });
    }));

    it('returns icon config',
      inject([DynamicFormIconService], (service: DynamicFormIconService) => {
        expect(service.iconConfig).toEqual(iconConfig);
      })
    );

    it('returns icon being undefined',
      inject([DynamicFormIconService], (service: DynamicFormIconService) => {
        const template = <DynamicFormIconTemplate>{};
        const icon = service.getIcon(template);

        expect(icon).toBeUndefined();
      })
    );

    it('returns icon not being mapped',
      inject([DynamicFormIconService], (service: DynamicFormIconService) => {
        const template = <DynamicFormIconTemplate>{ icon: 'pattern' };
        const icon = service.getIcon(template);

        expect(icon).toBe('pattern');
      })
    );

    it('returns icon being mapped from config',
      inject([DynamicFormIconService], (service: DynamicFormIconService) => {
        const template = <DynamicFormIconTemplate>{ icon: 'required' };
        const icon = service.getIcon(template);

        expect(icon).toBe('icon-required');
      })
    );
  });

  describe('with icon configs', () => {
    const iconConfigs: DynamicFormIconConfigs = [
      {
        icons: {
          required: 'icon-required-core',
          pattern: 'icon-pattern-core'
        },
        libraryName: 'core'
      },
      {
        icons: {
          required: 'icon-required-test',
          maxLength: 'icon-max-length-test'
        },
        libraryName: 'test'
      },
      {
        icons: {
          required: 'icon-required-test-extended',
          maxLength: 'icon-max-length-test-extended',
          minLength: 'icon-min-length-test-extended'
        },
        libraryName: 'test-extended'
      }
    ];

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({
              name: 'test',
              references: [ 'core' ]
            })
          },
          {
            provide: DYNAMIC_FORM_ICON_CONFIGS,
            useValue: iconConfigs
          },
          DynamicFormIconService
        ]
      });
    }));

    it('returns icon config being empty',
      inject([DynamicFormIconService], (service: DynamicFormIconService) => {
        expect(service.iconConfig).toEqual({
          icons: {
            required: 'icon-required-test',
            pattern: 'icon-pattern-core',
            maxLength: 'icon-max-length-test'
          },
          libraryName: 'test'
        });
      })
    );
  });
});
