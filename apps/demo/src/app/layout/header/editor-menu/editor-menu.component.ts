import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ExampleMenuItem } from '../../../state/examples/examples.model';
import { ExamplesState } from '../../../state/examples/examples.state';
import { EditorMenuPanelComponent } from './editor-menu-panel.component';

@Component({
  standalone: true,
  selector: 'app-editor-menu',
  templateUrl: './editor-menu.component.html',
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatMenuModule, EditorMenuPanelComponent],
})
export class EditorMenuComponent {
  @Select(ExamplesState.menuItems)
  items$: Observable<ExampleMenuItem[]>;
}
