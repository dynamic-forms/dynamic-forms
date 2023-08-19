import { Injectable, OnDestroy } from "@angular/core";
import { setupWorker, SetupWorker } from 'msw';
import { USER_ENDPOINTS } from "./user.endpoints";

@Injectable()
export class ApiService implements OnDestroy {
  private readonly _worker: SetupWorker;

  constructor() {
    this._worker = setupWorker(...USER_ENDPOINTS);
  }

  start(): void {
    this._worker.start({
      quiet: true,
      waitUntilReady: true,
      onUnhandledRequest: 'bypass',
    });
  }

  ngOnDestroy(): void {
    this._worker.stop();
  }
}

export const apiInitializer = (apiService: ApiService): () => void => () => apiService.start();