import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngxs/store';
import { LAYOUT } from '../../../state/layout/layout.model';
import { LayoutState } from '../../../state/layout/layout.state';
import { SidebarToggleComponent } from './sidebar-toggle.component';

describe('SidebarToggleComponent', () => {
  let fixture: ComponentFixture<SidebarToggleComponent>;
  let component: SidebarToggleComponent;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([LayoutState])],
      teardown: { destroyAfterEach: false },
    });

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(SidebarToggleComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('toggles sidebar opened state', () => {
    expect(store.selectSnapshot(LAYOUT).sidebar.opened).toBeFalse();

    component.toggle();

    expect(store.selectSnapshot(LAYOUT).sidebar.opened).toBeTrue();

    component.toggle();

    expect(store.selectSnapshot(LAYOUT).sidebar.opened).toBeFalse();
  });
});
