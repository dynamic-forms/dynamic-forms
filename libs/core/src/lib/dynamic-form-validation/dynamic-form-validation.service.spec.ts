import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormLibrary, DynamicFormLibraryName, DYNAMIC_FORM_LIBRARY } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormValidationConfig, DYNAMIC_FORM_VALIDATION_CONFIGS } from './dynamic-form-validation-config';
import { DynamicFormValidationService } from './dynamic-form-validation.service';

describe('DynamicFormValidationService', () => {
  const libraryName: DynamicFormLibraryName = 'test';
  const library: DynamicFormLibrary = { name: libraryName };
  const validationConfig: DynamicFormValidationConfig = {
    defaultMessage: 'The field is invalid',
    messages: {
      required: 'The field is required'
    },
    libraryName
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DYNAMIC_FORM_LIBRARY, useValue: library },
        { provide: DYNAMIC_FORM_VALIDATION_CONFIGS, useValue: [validationConfig ] },
        DynamicFormConfigService,
        DynamicFormValidationService
      ]
    });
  }));

  it('returns message being null',
    inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
      const message = service.getErrorMessage(null);

      expect(message).toBeNull();
    })
  );

  it('returns message from error',
    inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
      const message = service.getErrorMessage({ email: { message: 'The field is not a valid email' } });

      expect(message).toEqual( 'The field is not a valid email');
    })
  );

  it('returns message from config',
    inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
      const message = service.getErrorMessage({ required: {} });

      expect(message).toEqual(validationConfig.messages.required);
    })
  );

  it('returns default message from config',
    inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
      const message = service.getErrorMessage({});

      expect(message).toEqual(validationConfig.defaultMessage);
    })
  );
});
