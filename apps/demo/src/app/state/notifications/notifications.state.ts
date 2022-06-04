import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NotificationsToggle, NotificationItemPop, NotificationItemPush } from './notifications.actions';
import { Notifications, NOTIFICATIONS } from './notifications.model';

@State<Notifications>({
  name: NOTIFICATIONS,
  defaults: {
    enabled: true,
    items: [],
  },
})
@Injectable()
export class NotificationsState {
  @Selector()
  static enabled(state: Notifications): boolean {
    return state.enabled;
  }

  @Action(NotificationsToggle)
  toggle(context: StateContext<Notifications>, _action: NotificationsToggle): void {
    const state = context.getState();
    context.patchState({
      enabled: !state.enabled,
    });
  }

  @Action(NotificationItemPush)
  push(context: StateContext<Notifications>, action: NotificationItemPush): void {
    const state = context.getState();
    const item = action.item;
    context.patchState({
      items: [ item, ...state.items ],
    });
    if (item.duration) {
      setTimeout(() => context.dispatch(new NotificationItemPop(item)), item.duration);
    }
  }

  @Action(NotificationItemPop)
  pop(context: StateContext<Notifications>, action: NotificationItemPop): void {
    const state = context.getState();
    context.patchState({
      items: state.items.filter(item => item.id !== action.item.id),
    });
  }
}
