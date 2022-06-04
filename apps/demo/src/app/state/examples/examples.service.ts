import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ExamplesInit } from './examples.actions';
import { ExamplesMenu } from './examples.model';

@Injectable()
export class ExamplesService {
  constructor(private store: Store, private httpClient: HttpClient) {}

  load(): void {
    this.httpClient.get<ExamplesMenu>(`./assets/examples-menu.json`).subscribe({
      next: (menu) => this.store.dispatch(new ExamplesInit(menu)),
    });
  }
}
