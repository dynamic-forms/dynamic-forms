import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
    DynamicFormControlAsyncValidatorFn, DynamicFormControlAsyncValidatorType,
    dynamicFormLibrary, DynamicFormValidationModule,
} from '@dynamic-forms/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, of, switchMap, take } from 'rxjs';

export const dynamicFormControlUniqueUsernameValidatorFactory =
  (_, __, ___, ____, [ httpClient ]: [ HttpClient ]): DynamicFormControlAsyncValidatorFn => {
    const valueSubject = new BehaviorSubject(null);
    const valueError$ = valueSubject.pipe(
      distinctUntilChanged(),
      debounceTime(300),
      switchMap(value => {
        if (!value) {
          return of(null);
        }
        return httpClient.get<boolean>(`/api/users/name/unique/${value}`).pipe(
          map(unique => unique ? null : { error: true }),
        );
      }),
    );
    return (control: FormControl) => {
      valueSubject.next(control.value);
      return valueError$.pipe(take(1));
    };
  };

export const dynamicFormControlUniqueUsernameValidatorTypeFactory = (httpClient: HttpClient): DynamicFormControlAsyncValidatorType => {
  return {
    type: 'uniqueUsername',
    async: true,
    factory: dynamicFormControlUniqueUsernameValidatorFactory,
    deps: [ httpClient ],
    libraryName: dynamicFormLibrary.name,
  };
};

@NgModule({
  imports: [
    DynamicFormValidationModule.withControlValidatorFactory(dynamicFormControlUniqueUsernameValidatorTypeFactory, [ HttpClient ]),
  ],
  exports: [
    DynamicFormValidationModule,
  ],
})
export class DynamicFormExtensionsModule {}
