import { TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngxs/store';
import { SidebarToggle } from './layout.actions';
import { LAYOUT } from './layout.model';
import { LayoutState } from './layout.state';

describe('ExamplesState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([LayoutState])],
    });

    store = TestBed.inject(Store);
  });

  it('returns default state', () => {
    expect(store.selectSnapshot(LAYOUT)).toEqual({ sidebar: { opened: false } });
  });

  it('toggles sidebar opened state', () => {
    expect(store.selectSnapshot(LAYOUT).sidebar.opened).toBeFalse();

    store.dispatch(new SidebarToggle());

    expect(store.selectSnapshot(LAYOUT).sidebar.opened).toBeTrue();

    store.dispatch(new SidebarToggle());

    expect(store.selectSnapshot(LAYOUT).sidebar.opened).toBeFalse();
  });
});
