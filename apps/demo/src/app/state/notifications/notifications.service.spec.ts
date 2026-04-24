import { TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngxs/store';
import { catchError, delay, firstValueFrom, of, take, throwError } from 'rxjs';
import { NOTIFICATIONS, NotificationType } from './notifications.model';
import { NotificationsService } from './notifications.service';
import { NotificationsState } from './notifications.state';

describe('NotificationsService', () => {
  let store: Store;
  let service: NotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([NotificationsState])],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(NotificationsService);
  });

  it('getInfoMessage returns', () => {
    const message = service.getInfoMessage('title', 'info message');

    expect(message).toEqual({ type: NotificationType.Info, title: 'title', message: 'info message', duration: 2000 });
  });

  it('getErrorMessage returns', () => {
    const message = service.getErrorMessage('title', 'error message');

    expect(message).toEqual({ type: NotificationType.Error, title: 'title', message: 'error message', duration: 3000 });
  });

  it('getMessages returns', () => {
    const messages = service.getMessages('Loading started', 'Loading succeeded', 'Loading failed');

    expect(messages).toEqual({
      info: { type: NotificationType.Info, title: 'Loading started', message: undefined, duration: 2000 },
      success: { type: NotificationType.Info, title: 'Loading succeeded', message: undefined, duration: 2000 },
      error: { type: NotificationType.Error, title: 'Loading failed', message: undefined, duration: 3000 },
    });
  });

  it('pipe pushes info and success notifications', async () => {
    const messages = service.getMessages('Loading started', 'Loading succeeded', 'Loading failed');

    const action = service.pipe(of(true).pipe(delay(1000)), messages);

    const items = store.selectSnapshot(NOTIFICATIONS).items;

    expect(items.length).toBe(1);
    expect(items[0].title).toBe('Loading started');

    const result = await firstValueFrom(action.pipe(take(1)));

    expect(result).toBeTrue();

    const items2 = store.selectSnapshot(NOTIFICATIONS).items;

    expect(items2.length).toBe(1);
    expect(items2[0].title).toBe('Loading succeeded');
  });

  it('pipe pushes info and error notifications', async () => {
    const messages = service.getMessages('Loading started', 'Loading succeeded', 'Loading failed');

    const error = new Error();
    const action = service.pipe(throwError(() => error).pipe(delay(1000)), messages);

    const items = store.selectSnapshot(NOTIFICATIONS).items;

    expect(items.length).toBe(1);
    expect(items[0].title).toBe('Loading started');

    const result = await firstValueFrom(
      action.pipe(
        take(1),
        catchError(error => of(error)),
      ),
    );

    expect(result).toBe(error);

    const items2 = store.selectSnapshot(NOTIFICATIONS).items;

    expect(items2.length).toBe(1);
    expect(items2[0].title).toBe('Loading failed');
  });
});
