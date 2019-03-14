import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { SidebarToggle } from '../../../state/layout/layout.actions';

@Component({
  selector: 'app-sidebar-toggle',
  templateUrl: './sidebar-toggle.component.html',
  styleUrls: ['./sidebar-toggle.component.scss']
})
export class SidebarToggleComponent {
  constructor(private store: Store) {}

  toggle() {
    this.store.dispatch([
      new SidebarToggle()
    ]);
  }
}
