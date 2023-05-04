import { FormControl } from '@angular/forms';
import { DynamicFormControlValidatorFn } from '../../dynamic-form-control/dynamic-form-control-validator';
import { DynamicFormControlValidatorType } from '../../dynamic-form-control/dynamic-form-control-validator-type';
import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormFileUpload } from './dynamic-form-file';

export const dynamicFormFileMaxFileSizeValidatorFactory = (maxFileSize?: number): DynamicFormControlValidatorFn =>
  Number.isFinite(maxFileSize)
    ? (control: FormControl) => {
        if (!control.value) {
          return null;
        }
        if (control.value instanceof DynamicFormFileUpload) {
          return control.value.size > maxFileSize ? { maxFileSize: { filenames: control.value.name } } : null;
        }
        if (Array.isArray(control.value)) {
          const files = control.value.filter(item => item instanceof DynamicFormFileUpload && item.size > maxFileSize);
          return files.length ? { maxFileSize: { filenames: files.map(item => item.name).join(', ') } } : null;
        }
        return null;
      }
    : undefined;

export const dynamicFormFileMaxSizeValidatorType: DynamicFormControlValidatorType = {
  type: 'maxFileSize',
  factory: dynamicFormFileMaxFileSizeValidatorFactory,
  libraryName: dynamicFormLibrary.name,
};
