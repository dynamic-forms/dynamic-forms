import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
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
export class MaterialExamplesComponent extends DynamicFormExampleBase implements AfterViewInit {
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
