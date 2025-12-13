import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicFormControlAsyncValidatorFn, DynamicFormControlAsyncValidatorType, dynamicFormLibrary } from '@dynamic-forms/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, of, switchMap, take } from 'rxjs';

export const dynamicFormControlUniqueUsernameValidatorFactory = (): DynamicFormControlAsyncValidatorFn => {
  const httpClient = inject(HttpClient);
  const valueSubject = new BehaviorSubject(null);
  const valueError$ = valueSubject.pipe(
    distinctUntilChanged(),
    debounceTime(300),
    switchMap(value => {
      if (!value) {
        return of(null);
      }
      return httpClient.get('./assets/data/usernames.json').pipe(
        map((usernames: string[]) => {
          const valueLower = value.toLowerCase();
          return usernames.includes(valueLower) ? { error: true } : null;
        }),
      );
    }),
  );
  return (control: FormControl) => {
    valueSubject.next(control.value);
    return valueError$.pipe(take(1));
  };
};

export const dynamicFormControlUniqueUsernameValidatorTypeFactory = (): DynamicFormControlAsyncValidatorType => {
  return {
    type: 'uniqueUsername',
    async: true,
    factory: dynamicFormControlUniqueUsernameValidatorFactory,
    libraryName: dynamicFormLibrary.name,
  };
};
