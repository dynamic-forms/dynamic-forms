import { Component, DoCheck, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormComponent } from '@dynamic-forms/core';
import { DynamicFormExampleBase } from '../dynamic-form-example-base';

@Component({
  selector: 'app-material-examples',
  templateUrl: './material-examples.component.html',
  styleUrls: ['./material-examples.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MaterialExamplesComponent extends DynamicFormExampleBase implements DoCheck {
  @ViewChild(DynamicFormComponent)
  dynamicForm: DynamicFormComponent;
  dynamicFormValue: any;

  constructor(protected route: ActivatedRoute, protected dialog: MatDialog) {
    super(route, dialog);
  }

  ngDoCheck(): void {
    if (this.dynamicFormValue !== this.dynamicForm?.form.value) {
      this.dynamicFormValue = this.dynamicForm?.form.value;
    }
  }
}
