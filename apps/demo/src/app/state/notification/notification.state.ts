import { Action, Selector, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { NotificationItemPop, NotificationItemPush, NotificationToggle } from './notification.actions';
import { Notification } from './notification.model';

@State<Notification>({
  name: 'notification',
  defaults: {
    enabled: true,
    items: []
  }
})
export class NotificationState {
  @Action(NotificationToggle)
  toggle(context: StateContext<Notification>, _: NotificationToggle) {
    const state = context.getState();
    context.patchState({
      enabled: !state.enabled
    });
  }

  @Action(NotificationItemPush)
  push(context: StateContext<Notification>, action: NotificationItemPush) {
    const state = context.getState();
    const item = action.item;
    context.patchState({
      items: [ item, ...state.items ]
    });
    if (item.duration) {
      const popAction = new NotificationItemPop(item);
      return of({}).pipe(
        delay(item.duration),
        tap(_ => context.dispatch(popAction))
      );
    }
    return;
  }

  @Action(NotificationItemPop)
  pop(context: StateContext<Notification>, action: NotificationItemPush) {
    const state = context.getState();
    const index = state.items.findIndex(item => item.id === action.item.id);
    if (index >= 0) {
      state.items.splice(index, 1);
    }
    context.patchState({
      items: [ ...state.items ]
    });
  }
}
