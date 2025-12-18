import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngxs/store';
import { ExamplesState } from '../../../state/examples/examples.state';
import { ExamplesMenuPanelComponent } from './examples-menu-panel.component';

@Component({
  selector: 'app-examples-menu',
  imports: [AsyncPipe, MatButtonModule, MatIconModule, MatMenuModule, ExamplesMenuPanelComponent],
  templateUrl: './examples-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesMenuComponent {
  readonly items$ = inject(Store).select(ExamplesState.menuItems);
}
