import { Component, Input, ViewChild } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ExampleMenuItem } from '../../../state/examples/examples.model';

@Component({
  selector: 'app-editor-menu-panel',
  templateUrl: './editor-menu-panel.component.html',
  styleUrl: './editor-menu-panel.component.scss',
  imports: [RouterLink, RouterLinkActive, MatMenuModule],
})
export class EditorMenuPanelComponent {
  @ViewChild('menu', { static: true })
  menu: MatMenu;

  @Input() level: number;
  @Input() baseUrl: string;
  @Input() items: ExampleMenuItem[];
}
