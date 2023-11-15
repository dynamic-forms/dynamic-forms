import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MonacoEditorService {
  private readonly _window = window as { require?: any; monaco?: any };
  private readonly _baseUrl = './assets/monaco-editor/min/vs';

  private readonly _loading = new BehaviorSubject(false);
  private readonly _loaded = new BehaviorSubject(false);

  readonly loading$ = this._loading.asObservable();
  readonly loaded$ = this._loaded.asObservable();

  load(): void {
    if (typeof this._window.monaco === 'object') {
      this._loaded.next(true);
      return;
    }

    if (this._loading.value) {
      return;
    }

    this._loading.next(true);

    if (this._window.require) {
      this.loadMonaco();
    } else {
      this.loadMonacoLoader();
    }
  }

  private loadMonaco(): void {
    this._window.require.config({ paths: { vs: `${this._baseUrl}` } });
    this._window.require([`vs/editor/editor.main`], () => {
      this._loading.next(false);
      this._loaded.next(true);
    });
  }

  private loadMonacoLoader(): void {
    const loaderScript: HTMLScriptElement = document.createElement('script');
    loaderScript.type = 'text/javascript';
    loaderScript.src = `${this._baseUrl}/loader.js`;
    loaderScript.addEventListener('load', () => this.loadMonaco());
    document.body.appendChild(loaderScript);
  }
}
