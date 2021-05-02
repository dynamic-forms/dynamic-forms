import { Component, DoCheck, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormComponent } from '@dynamic-forms/core';
import { DynamicFormExampleBase } from '../dynamic-form-example-base';

@Component({
  selector: 'app-bootstrap-examples',
  templateUrl: './bootstrap-examples.component.html',
  styleUrls: ['./bootstrap-examples.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BootstrapExamplesComponent extends DynamicFormExampleBase implements DoCheck {
  @ViewChild(DynamicFormComponent)
  dynamicForm: DynamicFormComponent;
  dynamicFormValue: any;

  constructor(protected route: ActivatedRoute, protected dialog: MatDialog) {
    super(route, dialog);
  }

  ngDoCheck(): void {
    this.dynamicFormValue = this.dynamicForm?.form.value;
  }
}
