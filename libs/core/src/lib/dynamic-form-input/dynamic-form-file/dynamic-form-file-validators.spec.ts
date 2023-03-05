import { FormControl } from '@angular/forms';
import { DynamicFormFileUpload } from './dynamic-form-file';
import { dynamicFormFileMaxFileSizeValidatorFactory } from './dynamic-form-file-validators';

describe('DynamicFormValidatorsHelpers', () => {
  it('dynamicFormFileMaxFileSizeValidatorFactory returns validator being undefined', () => {
    const validator = dynamicFormFileMaxFileSizeValidatorFactory(null);

    expect(validator).toBeUndefined();
  });

  it('dynamicFormFileMaxFileSizeValidatorFactory returns validator being defined', () => {
    const validator = dynamicFormFileMaxFileSizeValidatorFactory(1);

    expect(validator).toBeDefined();
  });

  it('dynamicFormFileMaxFileSizeValidator returns null if control has no value', () => {
    const control = {} as FormControl;
    const validator = dynamicFormFileMaxFileSizeValidatorFactory(1);

    expect(validator(control)).toBeNull();
  });

  it('dynamicFormFileMaxFileSizeValidator returns null if control value is not a file', () => {
    const control = { value: 'value' } as FormControl;
    const validator = dynamicFormFileMaxFileSizeValidatorFactory(1);

    expect(validator(control)).toBeNull();
  });

  it('dynamicFormFileMaxFileSizeValidator returns null if file size does not exceed max file size', () => {
    const control = { value: new DynamicFormFileUpload(new File([''], 'file.txt')) } as FormControl;
    const validator = dynamicFormFileMaxFileSizeValidatorFactory(1);

    expect(validator(control)).toBeNull();
  });

  it('dynamicFormFileMaxFileSizeValidator returns error if file size exceeds max file size', () => {
    const control = { value: new DynamicFormFileUpload(new File(['DynamicFormsFileValidator'], 'file.txt')) } as FormControl;
    const validator = dynamicFormFileMaxFileSizeValidatorFactory(1);

    expect(validator(control)).toEqual({ maxFileSize: { filenames: 'file.txt' } });
  });

  it('dynamicFormFileMaxFileSizeValidator returns null if file sizes do not exceed max file size', () => {
    const control = {
      value: [
        new DynamicFormFileUpload(new File([''], 'file01.txt')),
        new DynamicFormFileUpload(new File([''], 'file02.txt')),
      ],
    } as FormControl;
    const validator = dynamicFormFileMaxFileSizeValidatorFactory(1);

    expect(validator(control)).toBeNull();
  });

  it('dynamicFormFileMaxFileSizeValidator returns error if file sizes exceed max file size', () => {
    const control = {
      value: [
        new DynamicFormFileUpload(new File([''], 'file01.txt')),
        new DynamicFormFileUpload(new File(['DynamicFormsFileValidator'], 'file02.txt')),
        new DynamicFormFileUpload(new File(['DynamicFormsFileValidator'], 'file03.txt')),
      ],
    } as FormControl;
    const validator = dynamicFormFileMaxFileSizeValidatorFactory(1);

    expect(validator(control)).toEqual({ maxFileSize: { filenames: 'file02.txt, file03.txt' } });
  });


});
