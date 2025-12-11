import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { NotificationsState } from '../../../state/notifications/notifications.state';
import { NotificationsToggleComponent } from './notifications-toggle.component';

describe('NotificationsToggleComponent', () => {
  let fixture: ComponentFixture<NotificationsToggleComponent>;
  let component: NotificationsToggleComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([NotificationsState])],
      teardown: { destroyAfterEach: false },
    });

    fixture = TestBed.createComponent(NotificationsToggleComponent);
    component = fixture.componentInstance;
  });

  it('creates component', async () => {
    expect(component).toBeTruthy();
    expect(await firstValueFrom(component.enabled$)).toBeTrue();
  });

  it('toggles notifications', async () => {
    expect(await firstValueFrom(component.enabled$)).toBeTrue();

    component.toggle();

    expect(await firstValueFrom(component.enabled$)).toBeFalse();

    component.toggle();

    expect(await firstValueFrom(component.enabled$)).toBeTrue();
  });
});
