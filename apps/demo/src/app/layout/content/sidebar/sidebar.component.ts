import { Component } from '@angular/core';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarMenuComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {}
