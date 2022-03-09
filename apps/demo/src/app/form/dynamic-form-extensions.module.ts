import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
    DynamicFormControlAsyncValidatorFn, DynamicFormControlAsyncValidatorType,
    dynamicFormLibrary, DynamicFormValidationModule
} from '@dynamic-forms/core';
import { map, of } from 'rxjs';

export const dynamicFormControlUniqueUsernameValidatorFactory =
    (_, __, ___, ____, [ httpClient ]: [ HttpClient ]): DynamicFormControlAsyncValidatorFn => (control: FormControl) => {
        if (!control.value) {
            return of(null);
        }
        return httpClient.get('./assets/data/usernames.json').pipe(
            map((usernames: string[]) => {
                const valueLower = control.value.toLowerCase();
                return usernames.includes(valueLower) ? { error: true } : null;
            })
        );
    };

export const dynamicFormControlUniqueUsernameValidatorTypeFactory = (httpClient: HttpClient): DynamicFormControlAsyncValidatorType => {
    return {
        type: 'uniqueUsername',
        async: true,
        factory: dynamicFormControlUniqueUsernameValidatorFactory,
        deps: [ httpClient ],
        libraryName: dynamicFormLibrary.name
    };
};

@NgModule({
    imports: [
        DynamicFormValidationModule.withControlValidatorFactory(dynamicFormControlUniqueUsernameValidatorTypeFactory, [ HttpClient ])
    ],
    exports: [
        DynamicFormValidationModule
    ]
})
export class DynamicFormExtensionsModule {}
