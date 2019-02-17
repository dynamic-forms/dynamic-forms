import { Component } from '@angular/core';
import { FormControlInputComponent } from '@dynamic-forms/core';
import { SelectInput } from './select-input';

@Component({
  selector: 'material-textbox',
  templateUrl: './select.component.html'
})
export class SelectComponent extends FormControlInputComponent<SelectInput> {
  compareWith(option1: any, option2: any) {
    return option1 === option2;
  }
}
