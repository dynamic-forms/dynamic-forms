import { JsonPipe } from '@angular/common';
import { Component, ContentChild, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { FormBase } from '../form/form-base';
import { MarkdownComponent } from '../markdown/markdown.component';

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html',
  imports: [JsonPipe, MatTabsModule, MarkdownComponent],
})
export class FormExampleComponent {
  @ContentChild('form')
  form: FormBase;

  @Input() docEnabled: boolean;
  @Input() docSource: string;
}
