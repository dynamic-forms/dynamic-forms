import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ProgressItemPop, ProgressItemPush } from './progress.actions';
import { Progress } from './progress.model';

@State<Progress>({
  name: 'progress',
  defaults: {
    items: []
  }
})
export class ProgressState {
  @Selector()
  static items(state: Progress) {
    return state.items;
  }

  @Action(ProgressItemPush)
  push(context: StateContext<Progress>, action: ProgressItemPush) {
    const state = context.getState();
    context.patchState({
      items: [ ...state.items, action.item ]
    });
  }

  @Action(ProgressItemPop)
  pop(context: StateContext<Progress>, action: ProgressItemPop) {
    const state = context.getState();
    const items = state.items.filter(item => item.id !== action.item.id);
    context.patchState({
      items: items
    });
  }
}
