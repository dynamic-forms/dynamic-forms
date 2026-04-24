import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngxs/store';
import { filter, firstValueFrom } from 'rxjs';
import config from '../../../assets/config.json';
import { CONFIG } from './config.model';
import { ConfigService } from './config.service';
import { ConfigState } from './config.state';

describe('ConfigService', () => {
  let store: Store;
  let service: ConfigService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting(), provideStore([ConfigState])],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(ConfigService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('loads config', async () => {
    service.load();

    const result = firstValueFrom(store.select(CONFIG).pipe(filter(config => !!config)));

    const request = httpTestingController.expectOne('./assets/config.json');

    request.flush(config);

    expect(await result).toEqual(config);

    httpTestingController.verify();
  });
});
