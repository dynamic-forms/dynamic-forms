import { MediaMatcher } from '@angular/cdk/layout';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngxs/store';
import { MockProvider } from 'ng-mocks';
import { firstValueFrom } from 'rxjs';
import { SetPreferences } from '../../../state/preferences/preferences.actions';
import { ThemeMode, defaultPreferences } from '../../../state/preferences/preferences.model';
import { PreferencesState } from '../../../state/preferences/preferences.state';
import preferencesDefinition from './preferences-form.json';
import { PreferencesMenuComponent } from './preferences-menu.component';

describe('PreferencesMenuComponent', () => {
  let fixture: ComponentFixture<PreferencesMenuComponent>;
  let component: PreferencesMenuComponent;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([PreferencesState])],
      teardown: { destroyAfterEach: false },
    });
  });

  describe('with light mode as default', () => {
    beforeEach(() => {
      const mediaMatcher = {
        matchMedia: () => {
          return { matches: false };
        },
      };

      TestBed.configureTestingModule({
        providers: [MockProvider(MediaMatcher, mediaMatcher, 'useValue')],
      });

      store = TestBed.inject(Store);
      fixture = TestBed.createComponent(PreferencesMenuComponent);
      component = fixture.componentInstance;
    });

    it('creates component', () => {
      expect(component).toBeTruthy();
    });

    it('has model and data', async () => {
      const theme = { ...defaultPreferences.theme, default: ThemeMode.Light };
      const preferences = { ...defaultPreferences, theme };

      const model = await firstValueFrom(component.model$);
      const data = await firstValueFrom(component.data$);

      expect(model).toEqual(preferences);
      expect(data).toEqual({ definition: preferencesDefinition, model });
    });

    it('sets preferences', async () => {
      spyOn(store, 'dispatch').and.callThrough();

      const theme = { ...defaultPreferences.theme, default: ThemeMode.Light, mode: ThemeMode.Dark };
      const preferences = { ...defaultPreferences, theme };

      component.setPreferences(preferences);

      const model = await firstValueFrom(component.model$);

      expect(model).toEqual(preferences);
      expect(store.dispatch).toHaveBeenCalledOnceWith(new SetPreferences(preferences));
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
        providers: [MockProvider(MediaMatcher, mediaMatcher, 'useValue')],
      });

      store = TestBed.inject(Store);
      fixture = TestBed.createComponent(PreferencesMenuComponent);
      component = fixture.componentInstance;
    });

    it('creates component', () => {
      expect(component).toBeTruthy();
    });

    it('has model and data', async () => {
      const theme = { ...defaultPreferences.theme, default: ThemeMode.Dark };
      const preferences = { ...defaultPreferences, theme };

      const model = await firstValueFrom(component.model$);
      const data = await firstValueFrom(component.data$);

      expect(model).toEqual(preferences);
      expect(data).toEqual({ definition: preferencesDefinition, model });
    });

    it('sets preferences', async () => {
      spyOn(store, 'dispatch').and.callThrough();

      const theme = { ...defaultPreferences.theme, default: ThemeMode.Dark, mode: ThemeMode.Light };
      const preferences = { ...defaultPreferences, theme };

      component.setPreferences(preferences);

      const model = await firstValueFrom(component.model$);

      expect(model).toEqual(preferences);
      expect(store.dispatch).toHaveBeenCalledOnceWith(new SetPreferences(preferences));
    });
  });
});
