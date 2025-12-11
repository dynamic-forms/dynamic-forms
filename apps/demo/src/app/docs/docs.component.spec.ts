import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngxs/store';
import { SetPreferences } from '../state/preferences/preferences.actions';
import { ThemeMode, defaultPreferences } from '../state/preferences/preferences.model';
import { PreferencesState } from '../state/preferences/preferences.state';
import { DocsComponent } from './docs.component';

describe('DocsComponent', () => {
  let fixture: ComponentFixture<DocsComponent>;
  let component: DocsComponent;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([PreferencesState])],
    });

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(DocsComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('has trusted source url and iframe', () => {
    fixture.componentRef.setInput('sourceUrl', './assets/testing/light/index.html');
    fixture.detectChanges();

    expect(component.trustedSourceUrl()).toBeTruthy();
    expect(component.iframe()).toBeTruthy();
  });

  describe('with light mode as default', () => {
    beforeEach(() => {
      const theme = { ...defaultPreferences.theme, default: ThemeMode.Light };
      const preferences = { ...defaultPreferences, theme };

      store.dispatch(new SetPreferences(preferences));

      fixture.componentRef.setInput('sourceUrl', './assets/testing/light/index.html');
      fixture.detectChanges();
    });

    it('has iframe and document', () => {
      const iframe = component.iframe();
      const document = iframe?.nativeElement.contentWindow?.document;

      expect(iframe).toBeTruthy();
      expect(document).toBeTruthy();
      expect(document?.body.classList.contains('dark')).toBeFalse();

      const preferences = store.selectSnapshot(PreferencesState.preferences);
      const theme = { ...preferences.theme, mode: ThemeMode.Dark };

      store.dispatch(new SetPreferences({ ...preferences, theme }));

      expect(document?.body.classList.contains('dark')).toBeTrue();
    });
  });

  describe('with dark mode as default', () => {
    beforeEach(() => {
      const theme = { ...defaultPreferences.theme, default: ThemeMode.Dark };
      const preferences = { ...defaultPreferences, theme };

      store.dispatch(new SetPreferences(preferences));

      fixture.componentRef.setInput('sourceUrl', './assets/testing/dark/index.html');
      fixture.detectChanges();
    });

    it('has iframe and document', () => {
      const iframe = component.iframe();
      const document = iframe?.nativeElement.contentWindow?.document;

      expect(iframe).toBeTruthy();
      expect(document).toBeTruthy();
      expect(document?.body.classList.contains('dark')).toBeTrue();

      const preferences = store.selectSnapshot(PreferencesState.preferences);
      const theme = { ...preferences.theme, mode: ThemeMode.Light };

      store.dispatch(new SetPreferences({ ...preferences, theme }));

      expect(document?.body.classList.contains('dark')).toBeFalse();
    });
  });
});
