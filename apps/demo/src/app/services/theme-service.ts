import { MediaMatcher } from '@angular/cdk/layout';
import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { ThemeMode } from '../state/preferences/preferences.model';
import { PreferencesState } from '../state/preferences/preferences.state';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _theme: BehaviorSubject<string>;
  private readonly _defaultMode: ThemeMode;
  readonly theme$: Observable<string>;

  constructor(
    private store: Store,
    private media: MediaMatcher,
    private destroyRef: DestroyRef,
  ) {
    const isDarkMode = this.media.matchMedia('(prefers-color-scheme: dark)').matches;
    this._defaultMode = isDarkMode ? ThemeMode.Dark : ThemeMode.Light;
    this._theme = new BehaviorSubject<string>(isDarkMode ? 'dark' : 'light');
    this.theme$ = this._theme.asObservable();
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
      this._theme.next('dark');
      document.body.classList.add('dark-mode');
    } else {
      this._theme.next('light');
      document.body.classList.remove('dark-mode');
    }
  }
}
