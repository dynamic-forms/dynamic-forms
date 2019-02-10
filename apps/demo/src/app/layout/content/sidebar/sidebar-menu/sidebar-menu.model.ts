export interface SidebarMenuItem {
  name: string;
  route: string[];
  children?: SidebarMenuItem[];
}

export const sidebarMenuItems: SidebarMenuItem[] = [
  {
    name: 'Home',
    route: ['/home']
  },
  {
    name: 'Docs',
    route: ['/docs']
  },
  {
    name: 'Examples',
    route: ['/examples'],
    children: [
    ]
  },
];
