import { Component, Input } from '@angular/core';
import { ExamplesMenuItem } from './examples-menu';

@Component({
  selector: 'app-examples-menu-list',
  templateUrl: './examples-menu-list.component.html',
  styleUrls: ['./examples-menu-list.component.scss']
})
export class ExamplesMenuListComponent {
  @Input()
  baseUrl: string;

  @Input()
  menuItems: ExamplesMenuItem[];
}
