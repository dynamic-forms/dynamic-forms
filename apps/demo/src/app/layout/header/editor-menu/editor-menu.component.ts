import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ExampleMenuItem } from '../../../state/examples/examples.model';
import { ExamplesState } from '../../../state/examples/examples.state';
import { EditorMenuPanelComponent } from './editor-menu-panel.component';

@Component({
  selector: 'app-editor-menu',
  imports: [AsyncPipe, MatButtonModule, MatIconModule, MatMenuModule, EditorMenuPanelComponent],
  templateUrl: './editor-menu.component.html',
})
export class EditorMenuComponent {
  readonly items$: Observable<ExampleMenuItem[]> = inject(Store).select(ExamplesState.menuItems);
}
