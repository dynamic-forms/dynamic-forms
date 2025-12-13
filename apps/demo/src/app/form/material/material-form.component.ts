import { Component } from '@angular/core';
import { FormBase } from '../form-base';
import { MaterialFormModule } from './material-form.module';

@Component({
  selector: 'app-material-form',
  imports: [MaterialFormModule],
  templateUrl: './material-form.component.html',
})
export class MaterialFormComponent extends FormBase {}
