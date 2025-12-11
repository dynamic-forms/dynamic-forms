import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngxs/store';
import { filter } from 'rxjs';
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

  it('loads config', done => {
    service.load();

    store
      .select(CONFIG)
      .pipe(filter(config => !!config))
      .subscribe(c => {
        expect(c).toEqual(config);
        done();
      });

    const request = httpTestingController.expectOne('./assets/config.json');

    request.flush(config);

    httpTestingController.verify();
  });
});
