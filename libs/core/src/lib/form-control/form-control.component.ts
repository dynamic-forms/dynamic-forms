import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormField } from '../form-field';
import { FormControlTemplate } from './form-control.model';

@Component({
  selector: 'dynamic-form-control',
  templateUrl: './form-control.component.html'
})
export class FormControlComponent {
  @Input() formField: FormField;
  @Output() modelChange = new EventEmitter<any>();

  get template(): FormControlTemplate {
    return <FormControlTemplate>this.formField.template;
  }

  get control(): FormControl {
    return <FormControl>this.formField.control;
  }
}
