import { Action, State, StateContext } from '@ngxs/store';
import { EMPTY, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { NotificationsToggle, NotificationItemPop, NotificationItemPush } from './notifications.actions';
import { Notifications, NOTIFICATIONS } from './notifications.model';

@State<Notifications>({
  name: NOTIFICATIONS,
  defaults: {
    enabled: true,
    items: []
  }
})
export class NotificationsState {
  @Action(NotificationsToggle)
  toggle(context: StateContext<Notifications>, _action: NotificationsToggle): void {
    const state = context.getState();
    context.patchState({
      enabled: !state.enabled
    });
  }

  @Action(NotificationItemPush)
  push(context: StateContext<Notifications>, action: NotificationItemPush): Observable<any> {
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
  pop(context: StateContext<Notifications>, action: NotificationItemPush): void {
    const state = context.getState();
    context.patchState({
      items: state.items.filter(item => item.id !== action.item.id)
    });
  }
}
