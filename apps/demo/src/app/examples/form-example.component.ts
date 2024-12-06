import { JsonPipe } from '@angular/common';
import { Component, contentChild, input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { FormBase } from '../form/form-base';
import { MarkdownComponent } from '../markdown/markdown.component';

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html',
  imports: [JsonPipe, MatTabsModule, MarkdownComponent],
})
export class FormExampleComponent {
  readonly form = contentChild<FormBase>('form');

  readonly docEnabled = input<boolean>(undefined);
  readonly docSource = input<string>(undefined);
}
