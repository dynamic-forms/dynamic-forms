import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { sidebarMenuItems, SidebarMenuItem } from './sidebar-menu.model';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent {
  treeControl: NestedTreeControl<SidebarMenuItem>;
  treeDataSource: MatTreeNestedDataSource<SidebarMenuItem>;

  constructor() {
    this.treeControl = new NestedTreeControl<SidebarMenuItem>((menuItem: any) => menuItem.children);
    this.treeDataSource = new MatTreeNestedDataSource<SidebarMenuItem>();
    this.treeDataSource.data = sidebarMenuItems;
  }

  hasChildren = (_: number, menuItem: any) => menuItem.children;
}
