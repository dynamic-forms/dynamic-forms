import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { environment } from '../../../environments/environment';
import { ConfigInit } from './config.actions';
import { Config } from './config.model';

@Injectable()
export class ConfigService {
  constructor(private store: Store, private httpClient: HttpClient) {}

  load(): void {
    const url = this.getConfigUrl();
    this.httpClient.get<Config>(url).subscribe(config => this.store.dispatch(new ConfigInit(config)));
  }

  private getConfigUrl(): string {
    return environment.production
      ? './assets/config.prod.json'
      : './assets/config.json';
  }
}
