import { dynamicFormValidationConfig } from './dynamic-form-validation-config';

describe('DynamicFormValidationConfig', () => {
  it('message for maxFileSize is message template', () => {
    const maxFileSizeMessage = dynamicFormValidationConfig.messages['maxFileSize'] as (_) => string;

    expect(maxFileSizeMessage).toBeInstanceOf(Function);
    expect(maxFileSizeMessage({ filenames: 'file.txt' })).toBe('The files file.txt do not fit the max size');
  });
});
