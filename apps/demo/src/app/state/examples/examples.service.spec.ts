import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngxs/store';
import { filter } from 'rxjs';
import { EXAMPLES } from './examples.model';
import { ExamplesService } from './examples.service';
import { ExamplesState } from './examples.state';

describe('ExamplesService', () => {
  let store: Store;
  let service: ExamplesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting(), provideStore([ExamplesState])],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(ExamplesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('loads examples', done => {
    const items = [{ id: 'id', label: 'Label' }];
    const menu = { items };

    service.load();

    store
      .select(EXAMPLES)
      .pipe(filter(examples => !!examples))
      .subscribe(examples => {
        expect(examples.menu).toEqual(menu);
        done();
      });

    const request = httpTestingController.expectOne('./assets/examples-menu.json');

    request.flush(menu);

    httpTestingController.verify();
  });
});
