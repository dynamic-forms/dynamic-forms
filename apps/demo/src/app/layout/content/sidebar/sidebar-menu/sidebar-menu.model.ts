export interface SidebarMenuItem {
  name: string;
  route?: string[];
  children?: SidebarMenuItem[];
}

export const sidebarMenuItems: SidebarMenuItem[] = [
  {
    name: 'Home',
    route: ['/home']
  },
  {
    name: 'Docs',
    route: ['/docs'],
    children: [
      {
        name: 'Bootstrap',
        route: ['/docs/bootstrap']
      },
      {
        name: 'Material',
        route: ['/docs/material']
      }
    ]
  },
  {
    name: 'Examples',
    children: [
      {
        name: 'Bootstrap',
        children: [
          {
            name: 'Inputs',
            route: ['/examples/bootstrap/inputs']
          }
        ]
      },
      {
        name: 'Material',
        children: [
          {
            name: 'Inputs',
            route: ['/examples/material/inputs']
          }
        ]
      }
    ]
  },
];
