import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialFormComponent } from '../../form/material/material-form.component';
import { FormExampleBase } from '../form-example-base';
import { FormExampleComponent } from '../form-example.component';

// eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
@Component({
  selector: 'app-material-examples',
  imports: [AsyncPipe, FormExampleComponent, MaterialFormComponent],
  templateUrl: './material-examples.component.html',
})
export class MaterialExamplesComponent extends FormExampleBase {}
