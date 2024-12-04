import { Component, Input, ViewChild } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ExampleMenuItem } from '../../../state/examples/examples.model';

@Component({
  selector: 'app-examples-menu-panel',
  templateUrl: './examples-menu-panel.component.html',
  styleUrl: './examples-menu-panel.component.scss',
  imports: [RouterLink, RouterLinkActive, MatMenuModule],
})
export class ExamplesMenuPanelComponent {
  @ViewChild('menu', { static: true })
  menu: MatMenu;

  @Input() baseUrl: string;
  @Input() items: ExampleMenuItem[];
}
