import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { SidebarToggle } from '../../../state/layout/layout.actions';

@Component({
  selector: 'app-sidebar-toggle',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './sidebar-toggle.component.html',
})
export class SidebarToggleComponent {
  private readonly store = inject(Store);

  toggle(): void {
    this.store.dispatch([new SidebarToggle()]);
  }
}
