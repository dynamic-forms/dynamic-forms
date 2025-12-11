import { TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngxs/store';
import { ConfigInit } from './config.actions';
import { CONFIG, Config } from './config.model';
import { ConfigState } from './config.state';

describe('ConfigState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([ConfigState])],
      teardown: { destroyAfterEach: false },
    });

    store = TestBed.inject(Store);
  });

  it('returns default state', () => {
    expect(store.selectSnapshot(CONFIG)).toBeNull();
    expect(store.selectSnapshot(ConfigState.repository)).toBeUndefined();
    expect(store.selectSnapshot(ConfigState.versions)).toBeUndefined();
  });

  it('returns initialized state', () => {
    const config = { repository: { url: 'https://github.com/dynamic-forms/dynamic-forms' }, versions: [{ name: '20.0.0' }] } as Config;

    store.dispatch(new ConfigInit(config));

    expect(store.selectSnapshot(CONFIG)).toEqual(config);
    expect(store.selectSnapshot(ConfigState.repository)).toBe(config.repository);
    expect(store.selectSnapshot(ConfigState.versions)).toBe(config.versions);
  });
});
