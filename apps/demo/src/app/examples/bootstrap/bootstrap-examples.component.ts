import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormExampleComponent } from '../dynamic-form-example.component';

@Component({
  selector: 'app-bootstrap-examples',
  templateUrl: './bootstrap-examples.component.html',
  styleUrls: ['./bootstrap-examples.component.scss']
})
export class BootstrapExamplesComponent extends DynamicFormExampleComponent  {
  constructor(protected route: ActivatedRoute, protected dialog: MatDialog) {
    super(route, dialog);
  }
}
