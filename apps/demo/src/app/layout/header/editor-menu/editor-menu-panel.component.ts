import { Component, input, viewChild } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ExampleMenuItem } from '../../../state/examples/examples.model';

@Component({
  selector: 'app-editor-menu-panel',
  templateUrl: './editor-menu-panel.component.html',
  imports: [RouterLink, RouterLinkActive, MatMenuModule],
})
export class EditorMenuPanelComponent {
  readonly menu = viewChild<MatMenu>('menu');

  readonly level = input<number>(undefined);
  readonly baseUrl = input<string>(undefined);
  readonly items = input<ExampleMenuItem[]>(undefined);
}
