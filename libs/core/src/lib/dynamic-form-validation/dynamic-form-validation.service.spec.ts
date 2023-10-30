import { TestBed, inject } from '@angular/core/testing';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DYNAMIC_FORM_VALIDATION_CONFIGS, DynamicFormValidationConfig, DynamicFormValidationConfigs,
  dynamicFormErrorMessageTemplate } from './dynamic-form-validation-config';
import { DynamicFormValidationModule } from './dynamic-form-validation.module';
import { DynamicFormValidationService } from './dynamic-form-validation.service';

describe('DynamicFormValidationService', () => {
  describe('without validation config', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormValidationModule,
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' }),
          },
        ],
      });
    });

    it('returns validation config being empty',
      inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
        expect(service.validationConfig).toEqual({
          defaultMessage: undefined,
          messages: {},
          libraryName: 'test',
        });
      }),
    );

    it('returns error message being undefined',
      inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
        const message = service.getErrorMessage({});

        expect(message).toBeUndefined();
      }),
    );
  });

  describe('with validation config', () => {
    const validationConfig: DynamicFormValidationConfig = {
      defaultMessage: 'The field is invalid',
      messages: {
        required: 'The field is required',
        maxFileSize: dynamicFormErrorMessageTemplate`The files ${'filenames'} do not fit the max size`,
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
            provide: DYNAMIC_FORM_VALIDATION_CONFIGS,
            useValue: [ validationConfig ],
          },
          DynamicFormValidationService,
        ],
      });
    });

    it('returns validation config',
      inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
        expect(service.validationConfig).toEqual(validationConfig);
      }),
    );

    it('returns message being null',
      inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
        const message = service.getErrorMessage(null);

        expect(message).toBeNull();
      }),
    );

    it('returns message from error',
      inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
        const message = service.getErrorMessage({ email: { message: 'The field is not a valid email' } });

        expect(message).toEqual('The field is not a valid email');
      }),
    );

    it('returns message from error for message template',
      inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
        const message = service.getErrorMessage({ maxFileSize: { filenames: 'file.txt' } });

        expect(message).toEqual('The files file.txt do not fit the max size');
      }),
    );

    it('returns message from config',
      inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
        const message = service.getErrorMessage({ required: {} });

        expect(message).toEqual(validationConfig.messages.required as string);
      }),
    );

    it('returns default message from config',
      inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
        const message = service.getErrorMessage({});

        expect(message).toEqual(validationConfig.defaultMessage);
      }),
    );
  });

  describe('with validation configs', () => {
    const validationConfigs: DynamicFormValidationConfigs = [
      {
        defaultMessage: 'messageCore',
        messages: {
          required: 'requiredCore',
          pattern: 'patternCore',
        },
        libraryName: 'core',
      },
      {
        defaultMessage: 'messageTest',
        messages: {
          required: 'requiredTest',
          maxLength: 'maxLengthTest',
        },
        libraryName: 'test',
      },
      {
        defaultMessage: 'messageTestExtended',
        messages: {
          required: 'requiredTestExtended',
          maxLength: 'maxLengthTestExtended',
          minLength: 'minLengthTestExtended',
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
            provide: DYNAMIC_FORM_VALIDATION_CONFIGS,
            useValue: validationConfigs,
          },
          DynamicFormValidationService,
        ],
      });
    });

    it('returns validation config being empty',
      inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
        expect(service.validationConfig).toEqual({
          defaultMessage: 'messageTest',
          messages: {
            required: 'requiredTest',
            pattern: 'patternCore',
            maxLength: 'maxLengthTest',
          },
          libraryName: 'test',
        });
      }),
    );
  });
});
