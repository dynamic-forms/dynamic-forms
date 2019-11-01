import { Component, Input, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material';
import { ExamplesMenuItem } from './examples-menu';

@Component({
  selector: 'app-examples-menu-panel',
  templateUrl: './examples-menu-panel.component.html',
  styleUrls: ['./examples-menu-panel.component.scss']
})
export class ExamplesMenuPanelComponent {
  @ViewChild('menu', { static: true })
  menu: MatMenu;

  @Input()
  baseUrl: string;

  @Input()
  items: ExamplesMenuItem[];
}
