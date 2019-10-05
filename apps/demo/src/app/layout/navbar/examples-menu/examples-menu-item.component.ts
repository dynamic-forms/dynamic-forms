import { Component, Input } from '@angular/core';
import { ExamplesMenuItem } from './examples-menu';

@Component({
  selector: 'app-examples-menu-item',
  templateUrl: './examples-menu-item.component.html',
  styleUrls: ['./examples-menu-item.component.scss']
})
export class ExamplesMenuItemComponent {
  @Input()
  baseUrl: string;

  @Input()
  menuItem: ExamplesMenuItem;
}
