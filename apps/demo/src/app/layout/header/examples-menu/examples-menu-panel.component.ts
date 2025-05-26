import { Component, input, viewChild } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ExampleMenuItem } from '../../../state/examples/examples.model';

@Component({
  selector: 'app-examples-menu-panel',
  imports: [RouterLink, RouterLinkActive, MatMenuModule],
  templateUrl: './examples-menu-panel.component.html',
})
export class ExamplesMenuPanelComponent {
  readonly menu = viewChild<MatMenu>('menu');

  readonly baseUrl = input<string>(undefined);
  readonly items = input<ExampleMenuItem[]>(undefined);
}
