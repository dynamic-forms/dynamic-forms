import { Component } from '@angular/core';
import { MarkdownComponent } from '../markdown/markdown.component';

@Component({
  selector: 'app-changelog',
  imports: [MarkdownComponent],
  templateUrl: './changelog.component.html',
})
export class ChangelogComponent {}
