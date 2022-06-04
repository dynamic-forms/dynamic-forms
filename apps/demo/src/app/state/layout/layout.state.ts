import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { SidebarToggle } from './layout.actions';
import { Layout, LAYOUT } from './layout.model';

@State<Layout>({
  name: LAYOUT,
  defaults: {
    sidebar: {
      opened: false,
    },
  },
})
@Injectable()
export class LayoutState {
  @Action(SidebarToggle)
  toggle(context: StateContext<Layout>, _action: SidebarToggle): void {
    const state = context.getState();
    context.patchState({
      sidebar: {
        opened: !state.sidebar.opened,
      },
    });
  }
}
