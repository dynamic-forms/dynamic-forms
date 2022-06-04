import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ProgressItemPop, ProgressItemPush } from './progress.actions';
import { Progress, PROGRESS } from './progress.model';

@State<Progress>({
  name: PROGRESS,
  defaults: {
    items: [],
  },
})
@Injectable()
export class ProgressState {
  @Action(ProgressItemPush)
  push(context: StateContext<Progress>, action: ProgressItemPush): void {
    const state = context.getState();
    context.patchState({
      items: [ ...state.items, action.item ],
    });
  }

  @Action(ProgressItemPop)
  pop(context: StateContext<Progress>, action: ProgressItemPop): void {
    const state = context.getState();
    context.patchState({
      items: state.items.filter(item => item.id !== action.item.id),
    });
  }
}
