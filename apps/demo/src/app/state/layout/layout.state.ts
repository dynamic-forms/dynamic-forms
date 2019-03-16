import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SidebarToggle } from './layout.actions';
import { Layout } from './layout.model';

@State<Layout>({
  name: 'sidebar',
  defaults: {
    sidebar: {
      opened: false
    }
  }
})
export class LayoutState {
  @Action(SidebarToggle)
  toggle(context: StateContext<Layout>, _: SidebarToggle) {
    const state = context.getState();
    context.patchState({
      sidebar: {
        opened: !state.sidebar.opened
      }
    });
  }
}
