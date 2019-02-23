import { Component } from '@angular/core';
import { DynamicFormControlInputComponent } from '@dynamic-forms/core';
import { SelectInput } from './select-input';

@Component({
  selector: 'mat-dynamic-select',
  templateUrl: './select.component.html'
})
export class SelectComponent extends DynamicFormControlInputComponent<SelectInput> {
  compareWith(option1: any, option2: any) {
    return option1 === option2;
  }
}
