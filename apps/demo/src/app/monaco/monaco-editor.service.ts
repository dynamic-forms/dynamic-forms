import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MonacoEditorService {
  private readonly _window = window as { require?: any; monaco?: any };
  private readonly _baseUrl = './assets/monaco-editor/min/vs';

  readonly isLoading = new BehaviorSubject(false);
  readonly isLoaded = new BehaviorSubject(false);

  load(): void {
    if (typeof this._window.monaco === 'object') {
      this.isLoaded .next(true);
      return;
    }

    if(this.isLoading.value) {
      return;
    }

    this.isLoading.next(true);

    if (this._window.require) {
      this.loadMonaco();
    } else {
      this.loadMonacoLoader();
    }
  }

  private loadMonaco(): void {
    this._window.require.config({ paths: { vs: `${this._baseUrl}` } });
    this._window.require([`vs/editor/editor.main`], () => {
      this.isLoading.next(false);
      this.isLoaded.next(true);
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
