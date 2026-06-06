import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngxs/store';
import { filter, firstValueFrom } from 'rxjs';
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

  it('loads examples', async () => {
    const items = [{ id: 'id', label: 'Label' }];
    const menu = { items };

    service.load();

    const result = firstValueFrom(store.select(EXAMPLES).pipe(filter(examples => !!examples)));

    const request = httpTestingController.expectOne('./assets/examples-menu.json');

    request.flush(menu);

    const examples = await result;
    expect(examples.menu).toEqual(menu);

    httpTestingController.verify();
  });
});
