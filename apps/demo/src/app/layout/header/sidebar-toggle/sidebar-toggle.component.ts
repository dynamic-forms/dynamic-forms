import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { SidebarToggle } from '../../../state/layout/layout.actions';

@Component({
  selector: 'app-sidebar-toggle',
  templateUrl: './sidebar-toggle.component.html',
  styleUrl: './sidebar-toggle.component.scss',
  imports: [MatButtonModule, MatIconModule],
})
export class SidebarToggleComponent {
  constructor(private store: Store) {}

  toggle(): void {
    this.store.dispatch([new SidebarToggle()]);
  }
}
