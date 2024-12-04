import { Component } from '@angular/core';
import { MarkdownComponent } from '../markdown/markdown.component';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  imports: [MarkdownComponent],
})
export class LicenseComponent {}
