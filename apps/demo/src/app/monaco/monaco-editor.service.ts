import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MONACO_REF } from './monaco-editor';

@Injectable()
export class MonacoEditorService {
  private readonly monacoRef = inject(MONACO_REF);
  private readonly _baseUrl = './assets/monaco-editor/min/vs';

  private readonly _loading = new BehaviorSubject(false);
  private readonly _loaded = new BehaviorSubject(false);

  readonly loading$ = this._loading.asObservable();
  readonly loaded$ = this._loaded.asObservable();

  init(): void {
    if (typeof this.monacoRef.monaco === 'object') {
      this._loaded.next(true);
      return;
    }

    if (this._loading.value) {
      return;
    }

    this._loading.next(true);

    if (this.monacoRef.require) {
      this.loadMonaco();
    } else {
      this.loadMonacoLoader();
    }
  }

  private loadMonaco(): void {
    this.monacoRef.require.config({ paths: { vs: `${this._baseUrl}` } });
    this.monacoRef.require([`vs/editor/editor.main`], () => {
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
