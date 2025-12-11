import { TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngxs/store';
import { delay, of } from 'rxjs';
import { PROGRESS } from './progress.model';
import { ProgressService } from './progress.service';
import { ProgressState } from './progress.state';

describe('ProgressService', () => {
  let store: Store;
  let service: ProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([ProgressState])],
      teardown: { destroyAfterEach: false },
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(ProgressService);
  });

  it('execute pushes and pops progress item', done => {
    const progressItem = { id: '1', title: 'Loading data' };

    service.execute(of(true).pipe(delay(100)), progressItem);

    const items = store.selectSnapshot(PROGRESS).items;

    expect(items.length).toBe(1);
    expect(items[0]).toEqual(progressItem);

    setTimeout(() => {
      const items = store.selectSnapshot(PROGRESS).items;

      expect(items.length).toBe(0);

      done();
    }, 150);
  });
});
