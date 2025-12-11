import { MediaMatcher } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { SetPreferences } from './preferences.actions';
import {
  FormEditorPreferences,
  PREFERENCES,
  Preferences,
  ThemeClass,
  ThemeMode,
  ThemePreferences,
  defaultPreferences,
} from './preferences.model';

@State<Preferences>({
  name: PREFERENCES,
  defaults: defaultPreferences,
})
@Injectable()
export class PreferencesState implements NgxsOnInit {
  constructor(private media: MediaMatcher) {}

  @Selector()
  static preferences(state: Preferences): Preferences {
    return state;
  }

  @Selector()
  static theme(state: Preferences): ThemePreferences {
    return state?.theme;
  }

  @Selector()
  static themeMode(state: Preferences): ThemeMode {
    return state?.theme?.mode || state?.theme?.default;
  }

  @Selector()
  static themeClass(state: Preferences): ThemeClass {
    const mode = this.themeMode(state);
    return mode === ThemeMode.Dark ? 'dark' : 'light';
  }

  @Selector()
  static formEditor(state: Preferences): FormEditorPreferences {
    return state?.formEditor;
  }

  @Action(SetPreferences)
  setPreferences(ctx: StateContext<Preferences>, { preferences }: SetPreferences) {
    ctx.setState(patch<Preferences>(preferences));
  }

  ngxsOnInit(ctx: StateContext<Preferences>) {
    const isDarkMode = this.media.matchMedia('(prefers-color-scheme: dark)').matches;
    ctx.setState(
      patch<Preferences>({
        theme: patch<ThemePreferences>({ default: isDarkMode ? ThemeMode.Dark : ThemeMode.Light }),
      }),
    );
  }
}
