import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { BootstrapFormComponent } from '../../form/bootstrap/bootstrap-form.component';
import { FormExampleBase } from '../form-example-base';
import { FormExampleComponent } from '../form-example.component';

@Component({
  selector: 'app-bootstrap-examples',
  imports: [AsyncPipe, FormExampleComponent, BootstrapFormComponent],
  templateUrl: './bootstrap-examples.component.html',
})
export class BootstrapExamplesComponent extends FormExampleBase {}
