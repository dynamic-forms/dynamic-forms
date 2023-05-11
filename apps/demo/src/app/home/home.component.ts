import { Component } from '@angular/core';
import { MarkdownComponent } from '../markdown/markdown.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MarkdownComponent],
})
export class HomeComponent {}
