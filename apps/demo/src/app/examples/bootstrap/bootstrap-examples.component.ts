import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
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
export class BootstrapExamplesComponent extends DynamicFormExampleBase implements AfterViewInit {
  @ViewChild(DynamicFormComponent)
  dynamicForm: DynamicFormComponent;

  constructor(protected route: ActivatedRoute, protected dialog: MatDialog) {
    super(route, dialog);
  }

  ngAfterViewInit(): void {
    console.log(this.dynamicForm);
    console.log(this.dynamicForm?.form);
  }
}
