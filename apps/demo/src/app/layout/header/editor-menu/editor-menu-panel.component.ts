import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { ExampleMenuItem } from '../../../state/examples/examples.model';

@Component({
  standalone: true,
  selector: 'app-editor-menu-panel',
  templateUrl: './editor-menu-panel.component.html',
  styleUrls: ['./editor-menu-panel.component.scss'],
  imports: [CommonModule, RouterModule, MatMenuModule],
})
export class EditorMenuPanelComponent {
  @ViewChild('menu', { static: true })
  menu: MatMenu;

  @Input() level: number;
  @Input() baseUrl: string;
  @Input() items: ExampleMenuItem[];
}
