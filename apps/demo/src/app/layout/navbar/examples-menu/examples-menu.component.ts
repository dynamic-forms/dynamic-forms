import { Component } from '@angular/core';
import * as menu from './examples-menu.json';

const templates = menu.templates;

@Component({
  selector: 'app-examples-menu',
  templateUrl: './examples-menu.component.html',
  styleUrls: ['./examples-menu.component.scss']
})
export class ExamplesMenuComponent {
  templates = templates;
}
