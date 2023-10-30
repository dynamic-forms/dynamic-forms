import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { ExampleMenuItem } from '../../../state/examples/examples.model';

@Component({
  standalone: true,
  selector: 'app-examples-menu-panel',
  templateUrl: './examples-menu-panel.component.html',
  styleUrls: ['./examples-menu-panel.component.scss'],
  imports: [CommonModule, RouterModule, MatMenuModule],
})
export class ExamplesMenuPanelComponent {
  @ViewChild('menu', { static: true })
  menu: MatMenu;

  @Input() baseUrl: string;
  @Input() items: ExampleMenuItem[];
}
