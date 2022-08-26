import { Component, Input, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { ExampleMenuItem } from '../../../state/examples/examples.model';

@Component({
  selector: 'app-editor-menu-panel',
  templateUrl: './editor-menu-panel.component.html',
  styleUrls: ['./editor-menu-panel.component.scss'],
})
export class EditorMenuPanelComponent {
  @ViewChild('menu', { static: true })
  menu: MatMenu;

  @Input() level: number;
  @Input() baseUrl: string;
  @Input() items: ExampleMenuItem[];
}
