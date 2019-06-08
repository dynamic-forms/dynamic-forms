import { Component, Input } from '@angular/core';
import { ExamplesMenuItem } from './examples-menu';

@Component({
  selector: 'app-examples-menu-items',
  templateUrl: './examples-menu-items.component.html',
  styleUrls: ['./examples-menu-items.component.scss']
})
export class ExamplesMenuItemsComponent {
  @Input()
  baseUrl: string;

  @Input()
  menuItems: ExamplesMenuItem[];
}
