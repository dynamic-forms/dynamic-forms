import { Component } from '@angular/core';
import { FormBase } from '../form-base';
import { MaterialFormModule } from './material-form.module';

// eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
@Component({
  selector: 'app-material-form',
  imports: [MaterialFormModule],
  templateUrl: './material-form.component.html',
})
export class MaterialFormComponent extends FormBase {}
