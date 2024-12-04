import { Component } from '@angular/core';
import { MarkdownComponent } from '../markdown/markdown.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [MarkdownComponent],
})
export class HomeComponent {}
