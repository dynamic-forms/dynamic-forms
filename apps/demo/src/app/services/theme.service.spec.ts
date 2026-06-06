import { TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngxs/store';
import { SetPreferences } from '../state/preferences/preferences.actions';
import { ThemeMode, defaultPreferences } from '../state/preferences/preferences.model';
import { PreferencesState } from '../state/preferences/preferences.state';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let store: Store;
  let themeService: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([PreferencesState])],
    });

    store = TestBed.inject(Store);
    themeService = TestBed.inject(ThemeService);
  });

  describe('with light mode as default', () => {
    beforeEach(() => {
      const theme = { ...defaultPreferences.theme, default: ThemeMode.Light };
      const preferences = { ...defaultPreferences, theme };

      store.dispatch(new SetPreferences(preferences));
    });

    it('init sets light mode and subscribes to theme mode changes', () => {
      const addSpy = spyOn(document.body.classList, 'add');
      const removeSpy = spyOn(document.body.classList, 'remove');

      themeService.init();

      expect(addSpy).not.toHaveBeenCalledWith(ThemeMode.Dark);
      expect(removeSpy).toHaveBeenCalledWith(ThemeMode.Dark);

      addSpy.calls.reset();
      removeSpy.calls.reset();

      const preferences = store.selectSnapshot(PreferencesState.preferences);
      const theme = { ...preferences.theme, mode: ThemeMode.Dark };

      store.dispatch(new SetPreferences({ ...preferences, theme }));

      expect(addSpy).toHaveBeenCalledWith(ThemeMode.Dark);
      expect(removeSpy).not.toHaveBeenCalledWith(ThemeMode.Dark);
    });
  });

  describe('with dark mode as default', () => {
    beforeEach(() => {
      const theme = { ...defaultPreferences.theme, default: ThemeMode.Dark };
      const preferences = { ...defaultPreferences, theme };

      store.dispatch(new SetPreferences(preferences));
    });

    it('init sets dark mode to theme mode changes', () => {
      const addSpy = spyOn(document.body.classList, 'add');
      const removeSpy = spyOn(document.body.classList, 'remove');

      themeService.init();

      expect(addSpy).toHaveBeenCalledWith(ThemeMode.Dark);
      expect(removeSpy).not.toHaveBeenCalledWith(ThemeMode.Dark);

      addSpy.calls.reset();
      removeSpy.calls.reset();

      const preferences = store.selectSnapshot(PreferencesState.preferences);
      const theme = { ...preferences.theme, mode: ThemeMode.Light };

      store.dispatch(new SetPreferences({ ...preferences, theme }));

      expect(addSpy).not.toHaveBeenCalledWith(ThemeMode.Dark);
      expect(removeSpy).toHaveBeenCalledWith(ThemeMode.Dark);
    });
  });
});
