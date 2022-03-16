import { Component, ContentChild, Input } from '@angular/core';
import { FormBase } from '../form/form-base';

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html'
})
export class FormExampleComponent {
  @ContentChild('form')
  form: FormBase;

  @Input() docEnabled: boolean;
  @Input() docSource: string;
}
