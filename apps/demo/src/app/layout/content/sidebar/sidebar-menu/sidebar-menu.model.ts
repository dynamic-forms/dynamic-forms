export interface SidebarMenuItem {
  label: string;
  route?: string;
  href?: string;
  children?: SidebarMenuItem[];
}
