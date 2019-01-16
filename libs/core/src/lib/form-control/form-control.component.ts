import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormControlTemplate, FormControlField, FormControlInput } from './form-control.model';

@Component({
  selector: 'dynamic-form-control',
  templateUrl: './form-control.component.html'
})
export class FormControlComponent {
  @Input() formField: FormControlField;
  @Output() modelChange = new EventEmitter<any>();

  get id(): string {
    return this.formField.path;
  }

  get template(): FormControlTemplate {
    return this.formField.template;
  }

  get control(): FormControl {
    return this.formField.control;
  }

  get input(): FormControlInput {
    return this.formField.template.input;
  }
}
