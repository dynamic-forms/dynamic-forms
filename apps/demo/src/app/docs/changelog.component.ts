import { Component } from '@angular/core';
import { MarkdownComponent } from '../markdown/markdown.component';

@Component({
  standalone: true,
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  imports: [MarkdownComponent],
})
export class ChangelogComponent {}
