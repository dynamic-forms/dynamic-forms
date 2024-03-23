import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ExampleMenuItem } from '../../../state/examples/examples.model';
import { ExamplesState } from '../../../state/examples/examples.state';
import { ExamplesMenuPanelComponent } from './examples-menu-panel.component';

@Component({
  standalone: true,
  selector: 'app-examples-menu',
  templateUrl: './examples-menu.component.html',
  styleUrl: './examples-menu.component.scss',
  imports: [AsyncPipe, NgIf, MatButtonModule, MatIconModule, MatMenuModule, ExamplesMenuPanelComponent],
})
export class ExamplesMenuComponent {
  @Select(ExamplesState.menuItems)
  items$: Observable<ExampleMenuItem[]>;
}
