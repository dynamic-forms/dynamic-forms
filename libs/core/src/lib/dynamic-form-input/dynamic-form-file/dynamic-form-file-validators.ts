import { FormControl } from '@angular/forms';
import { DynamicFormControlValidatorFn } from '../../dynamic-form-control/dynamic-form-control-validator';
import { DynamicFormControlValidatorType } from '../../dynamic-form-control/dynamic-form-control-validator-type';
import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormFileUpload } from './dynamic-form-file';

export const dynamicFormFileMaxFileSizeValidatorFactory = (maxSize?: number): DynamicFormControlValidatorFn =>
  Number.isFinite(maxSize)
    ? (control: FormControl) => {
        if (!control.value) {
          return null;
        }
        if (control.value instanceof DynamicFormFileUpload) {
          return control.value.size ? { maxFileSize: { filenames: control.value.name } } : null;
        }
        return null;
      }
    : undefined;
;

export const dynamicFormFileMaxSizeValidatorType: DynamicFormControlValidatorType = {
  type: 'maxFileSize',
  factory: dynamicFormFileMaxFileSizeValidatorFactory,
  libraryName: dynamicFormLibrary.name,
};
