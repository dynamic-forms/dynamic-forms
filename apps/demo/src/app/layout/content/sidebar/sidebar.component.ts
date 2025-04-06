import { Component } from '@angular/core';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [SidebarMenuComponent],
})
export class SidebarComponent {}
