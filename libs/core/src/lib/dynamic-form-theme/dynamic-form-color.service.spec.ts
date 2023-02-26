import { inject, TestBed } from '@angular/core/testing';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormColorConfig, DynamicFormColorConfigs, DYNAMIC_FORM_COLOR_CONFIGS } from './dynamic-form-color-config';
import { DynamicFormColorService } from './dynamic-form-color.service';

describe('DynamicFormColorService', () => {
  describe('without color config', () => {
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

    it('returns icon config being empty',
      inject([DynamicFormColorService], (service: DynamicFormColorService) => {
        expect(service.colorConfig).toEqual({
          colors: {},
          libraryName: 'test',
        });
      }),
    );

    it('returns color',
      inject([DynamicFormColorService], (service: DynamicFormColorService) => {
        const color = service.getColor('color');

        expect(color).toBe('color');
      }),
    );

    it('returns default color',
      inject([DynamicFormColorService], (service: DynamicFormColorService) => {
        const color = service.getColor(undefined, 'defaultColor');

        expect(color).toBe('defaultColor');
      }),
    );
  });

  describe('with color config', () => {
    const colorConfig: DynamicFormColorConfig = {
      colors: {
        primaryColor: 'primary',
      },
      libraryName: 'test',
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' }),
          },
          {
            provide: DYNAMIC_FORM_COLOR_CONFIGS,
            useValue: [ colorConfig ],
          },
          DynamicFormColorService,
        ],
      });
    });

    it('returns color config',
      inject([DynamicFormColorService], (service: DynamicFormColorService) => {
        expect(service.colorConfig).toEqual(colorConfig);
      }),
    );

    it('returns color being undefined',
      inject([DynamicFormColorService], (service: DynamicFormColorService) => {
        const color = service.getColor(undefined);

        expect(color).toBeUndefined();
      }),
    );

    it('returns color not being mapped',
      inject([DynamicFormColorService], (service: DynamicFormColorService) => {
        const color = service.getColor('primary');

        expect(color).toBe('primary');
      }),
    );

    it('returns color being mapped from config',
      inject([DynamicFormColorService], (service: DynamicFormColorService) => {
        const icon = service.getColor('primaryColor');

        expect(icon).toBe('primary');
      }),
    );
  });

  describe('with color configs', () => {
    const colorConfigs: DynamicFormColorConfigs = [
      {
        colors: {
          primaryColor: 'primary-core',
          secondaryColor: 'secondary-core',
        },
        libraryName: 'core',
      },
      {
        colors: {
          primaryColor: 'primary-test',
          tertiaryColor: 'tertiary-test',
        },
        libraryName: 'test',
      },
      {
        colors: {
          primaryColor: 'primary-test-extended',
          secondaryColor: 'secondary-test-extended',
          tertiaryColor: 'tertiary-extended',
        },
        libraryName: 'test-extended',
      },
    ];

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({
              name: 'test',
              references: [ 'core' ],
            }),
          },
          {
            provide: DYNAMIC_FORM_COLOR_CONFIGS,
            useValue: colorConfigs,
          },
          DynamicFormColorService,
        ],
      });
    });

    it('returns color config being merged',
      inject([DynamicFormColorService], (service: DynamicFormColorService) => {
        expect(service.colorConfig).toEqual({
          colors: {
            primaryColor: 'primary-test',
            secondaryColor: 'secondary-core',
            tertiaryColor: 'tertiary-test',
          },
          libraryName: 'test',
        });
      }),
    );
  });
});
