import { Component, DoCheck, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { DynamicFormComponent, DynamicFormDefinition, DynamicFormSubmit } from '@dynamic-forms/core';

@Component({
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MaterialFormComponent implements DoCheck {
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
