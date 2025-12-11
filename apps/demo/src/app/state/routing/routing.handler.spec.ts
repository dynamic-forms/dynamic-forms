import { TestBed } from '@angular/core/testing';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event as RouterEvent } from '@angular/router';
import { Store } from '@ngxs/store';
import { MockProvider } from 'ng-mocks';
import { Observable, Subject } from 'rxjs';
import { NotificationItemPush } from '../notifications/notifications.actions';
import { NotificationType } from '../notifications/notifications.model';
import { ProgressItemPop, ProgressItemPush } from '../progress/progress.actions';
import { RoutingHandler } from './routing.handler';

describe('RoutingHandler', () => {
  let store: Store;
  let events: Subject<RouterEvent>;
  let routingHandler: RoutingHandler;

  beforeEach(() => {
    events = new Subject<RouterEvent>();

    TestBed.configureTestingModule({
      providers: [
        MockProvider(Router, { events }, 'useValue'),
        MockProvider(Store, { dispatch: () => new Observable<void>() }, 'useValue'),
      ],
    });

    store = TestBed.inject(Store);
    routingHandler = TestBed.inject(RoutingHandler);
  });

  it('creates service', () => {
    expect(routingHandler).toBeTruthy();
  });

  it('handles navigation start and navigation end', () => {
    spyOn(store, 'dispatch');

    events.next(new NavigationStart(1, '/'));

    expect(store.dispatch).toHaveBeenCalledWith(new ProgressItemPush({ id: 1 }));

    events.next(new NavigationEnd(1, '/', '/'));

    expect(store.dispatch).toHaveBeenCalledWith(new ProgressItemPop({ id: 1 }));
  });

  it('handles navigation cancel', () => {
    spyOn(store, 'dispatch');

    events.next(new NavigationStart(1, '/'));

    expect(store.dispatch).toHaveBeenCalledWith(new ProgressItemPush({ id: 1 }));

    events.next(new NavigationCancel(1, '/', 'reason'));

    const notificationItem = {
      id: 'RoutingError1',
      type: NotificationType.Error,
      title: 'Navigation error',
      message: `Navigation to / canceled.`,
      duration: 3000,
    };
    expect(store.dispatch).toHaveBeenCalledWith([new ProgressItemPop({ id: 1 }), new NotificationItemPush(notificationItem)]);
  });

  it('handles navigation error', () => {
    spyOn(store, 'dispatch');

    events.next(new NavigationStart(1, '/'));

    expect(store.dispatch).toHaveBeenCalledWith(new ProgressItemPush({ id: 1 }));

    events.next(new NavigationError(1, '/', 'error'));

    const notificationItem = {
      id: 'RoutingError1',
      type: NotificationType.Error,
      title: 'Navigation error',
      message: `Navigation to / canceled.`,
      duration: 3000,
    };
    expect(store.dispatch).toHaveBeenCalledWith([new ProgressItemPop({ id: 1 }), new NotificationItemPush(notificationItem)]);
  });
});
