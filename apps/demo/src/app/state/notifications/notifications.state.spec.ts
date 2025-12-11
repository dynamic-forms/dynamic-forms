import { TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngxs/store';
import { NotificationItemPop, NotificationItemPush, NotificationsToggle } from './notifications.actions';
import { NOTIFICATIONS, NotificationType } from './notifications.model';
import { NotificationsState } from './notifications.state';

describe('NotificationsState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([NotificationsState])],
      teardown: { destroyAfterEach: false },
    });

    store = TestBed.inject(Store);
  });

  it('returns default state', () => {
    expect(store.selectSnapshot(NOTIFICATIONS)).toEqual({ enabled: true, items: [] });
    expect(store.selectSnapshot(NotificationsState.enabled)).toBeTrue();
  });

  it('toggles notifications', () => {
    expect(store.selectSnapshot(NotificationsState.enabled)).toBeTrue();

    store.dispatch(new NotificationsToggle());

    expect(store.selectSnapshot(NotificationsState.enabled)).toBeFalse();

    store.dispatch(new NotificationsToggle());

    expect(store.selectSnapshot(NotificationsState.enabled)).toBeTrue();
  });

  it('pushes and pops notification items', () => {
    const items = [
      { id: 'id1', type: NotificationType.Info, title: 'Info1' },
      { id: 'id2', type: NotificationType.Info, title: 'Info2' },
      { id: 'id3', type: NotificationType.Info, title: 'Info3' },
    ];

    store.dispatch(new NotificationItemPush(items[0]));

    expect(store.selectSnapshot(NOTIFICATIONS)).toEqual({ enabled: true, items: [items[0]] });

    store.dispatch(new NotificationItemPush(items[1]));

    expect(store.selectSnapshot(NOTIFICATIONS)).toEqual({ enabled: true, items: [items[1], items[0]] });

    store.dispatch(new NotificationItemPush(items[2]));

    expect(store.selectSnapshot(NOTIFICATIONS)).toEqual({ enabled: true, items: [items[2], items[1], items[0]] });

    store.dispatch(new NotificationItemPop(items[1]));

    expect(store.selectSnapshot(NOTIFICATIONS)).toEqual({ enabled: true, items: [items[2], items[0]] });

    store.dispatch(new NotificationItemPop(items[0]));

    expect(store.selectSnapshot(NOTIFICATIONS)).toEqual({ enabled: true, items: [items[2]] });

    store.dispatch(new NotificationItemPop(items[2]));

    expect(store.selectSnapshot(NOTIFICATIONS)).toEqual({ enabled: true, items: [] });
  });

  it('pushes und pops notification item with duration', done => {
    const item = { id: 'id1', type: NotificationType.Info, title: 'Info1', duration: 100 };

    store.dispatch(new NotificationItemPush(item));

    expect(store.selectSnapshot(NOTIFICATIONS)).toEqual({ enabled: true, items: [item] });

    setTimeout(() => {
      expect(store.selectSnapshot(NOTIFICATIONS)).toEqual({ enabled: true, items: [] });
      done();
    }, 150);
  });
});
