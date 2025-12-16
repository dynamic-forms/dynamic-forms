import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MarkdownComponent } from '../markdown/markdown.component';

@Component({
  selector: 'app-home',
  imports: [MarkdownComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
