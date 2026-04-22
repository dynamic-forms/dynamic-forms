import { MediaMatcher } from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngxs/store';
import { MockProvider } from 'ng-mocks';
import { SetPreferences } from './preferences.actions';
import { FormEditorPreviewMode, PREFERENCES, ThemeMode, defaultPreferences } from './preferences.model';
import { PreferencesState } from './preferences.state';

describe('PreferencesState', () => {
  let store: Store;

  describe('with light mode as default', () => {
    beforeEach(() => {
      const mediaMatcher = {
        matchMedia: () => {
          return { matches: false };
        },
      };

      TestBed.configureTestingModule({
        providers: [provideStore([PreferencesState]), MockProvider(MediaMatcher, mediaMatcher, 'useValue')],
      });

      store = TestBed.inject(Store);
    });

    it('returns default state', () => {
      const theme = { ...defaultPreferences.theme, default: ThemeMode.Light };
      const preferences = { ...defaultPreferences, theme };

      expect(store.selectSnapshot(PREFERENCES)).toEqual(preferences);
      expect(store.selectSnapshot(PreferencesState.preferences)).toEqual(preferences);
      expect(store.selectSnapshot(PreferencesState.theme)).toEqual({ mode: null, default: ThemeMode.Light });
      expect(store.selectSnapshot(PreferencesState.themeMode)).toBe(ThemeMode.Light);
      expect(store.selectSnapshot(PreferencesState.themeClass)).toBe('light');
      expect(store.selectSnapshot(PreferencesState.formEditor)).toEqual(preferences.formEditor);
    });

    it('sets preferences', () => {
      const theme = { default: ThemeMode.Light, mode: ThemeMode.Dark };
      const formEditor = { previewMode: FormEditorPreviewMode.SplitView };
      const preferences = { theme, formEditor };

      store.dispatch(new SetPreferences(preferences));

      expect(store.selectSnapshot(PREFERENCES)).toEqual(preferences);
    });
  });

  describe('with dark mode as default', () => {
    beforeEach(() => {
      const mediaMatcher = {
        matchMedia: () => {
          return { matches: true };
        },
      };

      TestBed.configureTestingModule({
        providers: [provideStore([PreferencesState]), MockProvider(MediaMatcher, mediaMatcher, 'useValue')],
      });

      store = TestBed.inject(Store);
    });

    it('returns default state', () => {
      const theme = { ...defaultPreferences.theme, default: ThemeMode.Dark };
      const preferences = { ...defaultPreferences, theme };

      expect(store.selectSnapshot(PREFERENCES)).toEqual(preferences);
      expect(store.selectSnapshot(PreferencesState.preferences)).toEqual(preferences);
      expect(store.selectSnapshot(PreferencesState.theme)).toEqual({ mode: null, default: ThemeMode.Dark });
      expect(store.selectSnapshot(PreferencesState.themeMode)).toBe(ThemeMode.Dark);
      expect(store.selectSnapshot(PreferencesState.themeClass)).toBe('dark');
      expect(store.selectSnapshot(PreferencesState.formEditor)).toEqual(preferences.formEditor);
    });

    it('sets preferences', () => {
      const theme = { default: ThemeMode.Dark, mode: ThemeMode.Light };
      const formEditor = { previewMode: FormEditorPreviewMode.SplitView };
      const preferences = { theme, formEditor };

      store.dispatch(new SetPreferences(preferences));

      expect(store.selectSnapshot(PREFERENCES)).toEqual(preferences);
    });
  });
});
