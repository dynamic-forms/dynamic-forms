import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormLibrary, DynamicFormLibraryName } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormValidationConfig } from '../dynamic-form-validation/dynamic-form-validation-config';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormFieldBase } from './dynamic-form-field-base';

class DynamicFormFieldBaseTest extends DynamicFormFieldBase {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

describe('DynamicFormFieldBase', () => {
  const libraryName: DynamicFormLibraryName = 'test';
  const library: DynamicFormLibrary = { name: libraryName };
  const validationConfig: DynamicFormValidationConfig = {
    defaultMessage: 'The field is invalid',
    messages: {
      required: 'The field is required'
    },
    libraryName
  };
  let component: DynamicFormFieldBaseTest;

  beforeEach(() => {
    const configService = new DynamicFormConfigService(library, null, null, null, null, null, [ validationConfig ]);
    const validationService = new DynamicFormValidationService(configService);

    component = new DynamicFormFieldBaseTest(validationService);
  });

  it('errors returns errors from control', () => {
    const field = <any>{ id: 'id', key: 'key', index: 1, path: 'path', control: {} };
    component.field = field;

    expect(component.id).toBe('id');
    expect(component.key).toBe('key');
    expect(component.index).toBe(1);
    expect(component.path).toBe('path');
    expect(component.element).toBe(field);
    expect(component.field).toBe(field);
    expect(component.control).toBe(field.control);
  });

  it('errors returns errors from control', () => {
    const errors = { email: { message: 'The field is not a valid email' } };

    component.field = <any>{ control: { errors } };

    expect(component.errors).toEqual(errors);
  });

  it('hasErrors returns true if errors exist', () => {
    component.field = <any>{ control: { errors: {} } };

    expect(component.hasErrors).toBe(true);
  });

  it('hasErrors returns false if no errors exist', () => {
    component.field = <any>{ control: { errors: null } };

    expect(component.hasErrors).toBe(false);
  });

  it('showErrors returns false if no errors exist', () => {
    component.field = <any>{ control: { errors: null, touched: true } };

    expect(component.showErrors).toBe(false);
  });

  it('showErrors returns false if errors exist but control is untouched', () => {
    component.field = <any>{ control: { errors: {}, touched: false } };

    expect(component.showErrors).toBe(false);
  });

  it('showErrors returns true if errors exist and control is touched', () => {
    component.field = <any>{ control: { errors: {}, touched: true } };

    expect(component.showErrors).toBe(true);
  });

  it('errorMessage returns message from error', () => {
    const errors = { email: { message: 'The field is not a valid email' } };

    component.field = <any>{ control: { errors } };

    expect(component.errorMessage).toEqual(errors.email.message);
  });

  it('errorMessage returns message from config', () => {
    component.field = <any>{ control: { errors: { required: {} } } };

    expect(component.errorMessage).toEqual(validationConfig.messages.required);
  });

  it('errorMessage returns default message from config for unknown error', () => {
    component.field = <any>{ control: { errors: { pattern: {} } } };

    expect(component.errorMessage).toEqual(validationConfig.defaultMessage);
  });

  it('errorMessage returns default message from config for unspecified error', () => {
    component.field = <any>{ control: { errors: {} } };

    expect(component.errorMessage).toEqual(validationConfig.defaultMessage);
  });
});
