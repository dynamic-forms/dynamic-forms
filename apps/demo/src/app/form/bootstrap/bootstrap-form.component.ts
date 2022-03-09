import { Component, DoCheck, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { DynamicFormComponent, DynamicFormDefinition, DynamicFormSubmit } from '@dynamic-forms/core';

@Component({
  selector: 'app-bootstrap-form',
  templateUrl: './bootstrap-form.component.html',
  styleUrls: ['./bootstrap-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BootstrapFormComponent implements DoCheck {
  @Input() definition: DynamicFormDefinition;
  @Input() model: any;
  @Output() formSubmit: EventEmitter<DynamicFormSubmit> = new EventEmitter<DynamicFormSubmit>();

  @ViewChild(DynamicFormComponent)
  dynamicForm: DynamicFormComponent;
  dynamicFormValue: any;

  ngDoCheck(): void {
    if (this.dynamicFormValue !== this.dynamicForm?.form.value) {
      this.dynamicFormValue = this.dynamicForm?.form.value;
    }
  }
}
