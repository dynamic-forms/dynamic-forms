import { JsonPipe } from '@angular/common';
import { Component, contentChild, input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { FormBase } from '../form/form-base';
import { MarkdownComponent } from '../markdown/markdown.component';

// eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
@Component({
  selector: 'app-form-example',
  imports: [JsonPipe, MatTabsModule, MarkdownComponent],
  templateUrl: './form-example.component.html',
})
export class FormExampleComponent {
  readonly form = contentChild.required<FormBase>('form');

  readonly docEnabled = input<boolean>(undefined);
  readonly docSource = input<string>(undefined);
}
