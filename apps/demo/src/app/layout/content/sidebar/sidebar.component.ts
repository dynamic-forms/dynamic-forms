import { Component } from '@angular/core';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [SidebarMenuComponent],
})
export class SidebarComponent {}
