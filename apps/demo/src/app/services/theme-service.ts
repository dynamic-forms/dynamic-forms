import { MediaMatcher } from '@angular/cdk/layout';
import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { ThemeMode } from '../state/preferences/preferences.model';
import { PreferencesState } from '../state/preferences/preferences.state';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _defaultMode: ThemeMode;

  constructor(
    private store: Store,
    private media: MediaMatcher,
    private destroyRef: DestroyRef,
  ) {
    this._defaultMode = this.media.matchMedia('(prefers-color-scheme: dark)').matches ? ThemeMode.Dark : ThemeMode.Light;
  }

  init(): void {
    this.store
      .select(PreferencesState.theme)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(theme => theme?.mode),
        distinctUntilChanged(),
      )
      .subscribe(mode => this.setThemeMode(mode));
  }

  private setThemeMode(mode?: ThemeMode): void {
    if ((mode || this._defaultMode) === ThemeMode.Dark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
