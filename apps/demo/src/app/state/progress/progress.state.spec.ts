import { TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngxs/store';
import { ProgressItemPop, ProgressItemPush } from './progress.actions';
import { PROGRESS } from './progress.model';
import { ProgressState } from './progress.state';

describe('ProgressState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([ProgressState])],
      teardown: { destroyAfterEach: false },
    });

    store = TestBed.inject(Store);
  });

  it('returns default state', () => {
    expect(store.selectSnapshot(PROGRESS)).toEqual({ items: [] });
  });

  it('pushes and pops progress items', () => {
    const items = [
      { id: 'id1', message: 'Loading' },
      { id: 'id2', message: 'Loading' },
      { id: 'id3', message: 'Loading' },
    ];

    store.dispatch(new ProgressItemPush(items[0]));

    expect(store.selectSnapshot(PROGRESS)).toEqual({ items: [items[0]] });

    store.dispatch(new ProgressItemPush(items[1]));

    expect(store.selectSnapshot(PROGRESS)).toEqual({ items: [items[0], items[1]] });

    store.dispatch(new ProgressItemPush(items[2]));

    expect(store.selectSnapshot(PROGRESS)).toEqual({ items: [items[0], items[1], items[2]] });

    store.dispatch(new ProgressItemPop(items[0]));

    expect(store.selectSnapshot(PROGRESS)).toEqual({ items: [items[1], items[2]] });

    store.dispatch(new ProgressItemPop(items[1]));

    expect(store.selectSnapshot(PROGRESS)).toEqual({ items: [items[2]] });

    store.dispatch(new ProgressItemPop(items[2]));

    expect(store.selectSnapshot(PROGRESS)).toEqual({ items: [] });
  });
});
