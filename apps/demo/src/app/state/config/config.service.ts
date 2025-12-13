import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { ConfigInit } from './config.actions';
import { Config } from './config.model';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private readonly store = inject(Store);
  private readonly httpClient = inject(HttpClient);

  load(): void {
    this.httpClient.get<Config>('./assets/config.json').subscribe(config => this.store.dispatch(new ConfigInit(config)));
  }
}
