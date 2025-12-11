import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { NotificationItemPush } from '../../state/notifications/notifications.actions';
import { NotificationType } from '../../state/notifications/notifications.model';
import { NotificationsState } from '../../state/notifications/notifications.state';
import { NotificationsComponent } from './notifications.component';

describe('NotificationsComponent', () => {
  let fixture: ComponentFixture<NotificationsComponent>;
  let component: NotificationsComponent;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([NotificationsState])],
      teardown: { destroyAfterEach: false },
    });

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
  });

  it('creates component', async () => {
    expect(component).toBeTruthy();
    expect(await firstValueFrom(component.notifications$)).toEqual({ enabled: true, items: [] });
  });

  it('removes notification', async () => {
    const notification = { id: 1, type: NotificationType.Info, title: 'title' };

    store.dispatch(new NotificationItemPush(notification));

    expect(await firstValueFrom(component.notifications$)).toEqual({ enabled: true, items: [notification] });

    component.remove(notification);

    expect(await firstValueFrom(component.notifications$)).toEqual({ enabled: true, items: [] });
  });
});
