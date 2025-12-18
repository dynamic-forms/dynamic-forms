import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MarkdownComponent } from '../markdown/markdown.component';

@Component({
  selector: 'app-license',
  imports: [MarkdownComponent],
  templateUrl: './license.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicenseComponent {}
