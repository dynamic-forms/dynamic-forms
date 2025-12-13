import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { ExamplesInit } from './examples.actions';
import { ExamplesMenu } from './examples.model';

@Injectable({ providedIn: 'root' })
export class ExamplesService {
  private readonly store = inject(Store);
  private readonly httpClient = inject(HttpClient);

  load(): void {
    this.httpClient.get<ExamplesMenu>('./assets/examples-menu.json').subscribe(menu => this.store.dispatch(new ExamplesInit(menu)));
  }
}
