import { Action, State, StateContext } from '@ngxs/store';
import { EMPTY, Observable } from 'rxjs';
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
  toggle(context: StateContext<Notification>, _action: NotificationToggle): void {
    const state = context.getState();
    context.patchState({
      enabled: !state.enabled
    });
  }

  @Action(NotificationItemPush)
  push(context: StateContext<Notification>, action: NotificationItemPush): Observable<any> {
    const state = context.getState();
    const item = action.item;
    context.patchState({
      items: [ item, ...state.items ]
    });
    if (item.duration) {
      const popAction = new NotificationItemPop(item);
      return EMPTY.pipe(
        delay(item.duration),
        tap(_ => context.dispatch(popAction))
      );
    }
    return;
  }

  @Action(NotificationItemPop)
  pop(context: StateContext<Notification>, action: NotificationItemPush): void {
    const state = context.getState();
    context.patchState({
      items: state.items.filter(item => item.id !== action.item.id)
    });
  }
}
