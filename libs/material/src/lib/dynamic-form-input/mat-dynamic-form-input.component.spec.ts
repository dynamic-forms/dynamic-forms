import { DynamicFormControl, DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormInputComponent } from './mat-dynamic-form-input.component';

describe('MatDynamicFormInputComponent', () => {
  it('get error message returns error message from validation service', () => {
    const validationService = <DynamicFormValidationService>{
      getErrorMessage: errors => errors ? 'Error message' : null
    };
    const component = new MatDynamicFormInputComponent(validationService);

    component.field = <DynamicFormControl>{ control: { errors: {} } };

    expect(component.errorMessage).toBe('Error message');

    component.field = <DynamicFormControl>{ control: {} };

    expect(component.errorMessage).toBeNull();
  });
});
