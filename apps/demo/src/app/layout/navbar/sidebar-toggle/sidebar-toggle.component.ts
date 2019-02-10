import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-toggle',
  templateUrl: './sidebar-toggle.component.html',
  styleUrls: ['./sidebar-toggle.component.scss']
})
export class SidebarToggleComponent {
  private sidebarOpened = true;

  toggle() {
    this.sidebarOpened = !this.sidebarOpened;
  }
}
