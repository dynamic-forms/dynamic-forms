import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExamplesMenu } from './examples-menu';

@Injectable()
export class ExamplesMenuService {
  constructor(private httpClient: HttpClient) {}

  getMenu() {
    return this.httpClient.get<ExamplesMenu>(`./assets/examples-menu.json`);
  }
}
