import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-form-example',
  templateUrl: './dynamic-form-example.component.html'
})
export class DynamicFormExampleComponent {
  @Input() docEnabled: boolean;
  @Input() doc: string;
}
