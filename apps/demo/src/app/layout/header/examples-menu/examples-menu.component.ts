import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  styleUrls: ['./examples-menu.component.scss'],
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatMenuModule, ExamplesMenuPanelComponent],
})
export class ExamplesMenuComponent {
  @Select(ExamplesState.menuItems)
  items$: Observable<ExampleMenuItem[]>;
}
