import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { distinctUntilChanged } from 'rxjs/operators';
import { ThemeMode } from '../state/preferences/preferences.model';
import { PreferencesState } from '../state/preferences/preferences.state';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  themeClass$: any;
  constructor(
    private store: Store,
    private destroyRef: DestroyRef,
  ) {}

  init(): void {
    this.store
      .select(PreferencesState.themeMode)
      .pipe(takeUntilDestroyed(this.destroyRef), distinctUntilChanged())
      .subscribe(mode => this.setThemeMode(mode));
  }

  private setThemeMode(mode: ThemeMode): void {
    if (mode === ThemeMode.Dark) {
      document.body.classList.add(ThemeMode.Dark);
    } else {
      document.body.classList.remove(ThemeMode.Dark);
    }
  }
}
