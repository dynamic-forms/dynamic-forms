import { Component, ViewChild } from '@angular/core';
import { cloneObject, DynamicFormComponent, DynamicFormDefinition } from '@dynamic-forms/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SetPreferences } from '../../../state/preferences/preferences.actions';
import { Preferences } from '../../../state/preferences/preferences.model';
import { PreferencesState } from '../../../state/preferences/preferences.state';
import preferencesDefinition from './preferences-form.json';

@Component({
  selector: 'app-preferences-menu',
  templateUrl: './preferences-menu.component.html',
  styleUrls: ['./preferences-menu.component.scss'],
})
export class PreferencesMenuComponent {
  readonly definition: DynamicFormDefinition = preferencesDefinition;
  readonly model$: Observable<Preferences>;

  @ViewChild(DynamicFormComponent)
  dynamicForm: DynamicFormComponent;

  constructor(private store: Store) {
    this.model$ = this.store.select(PreferencesState).pipe(
      filter((preferences) => preferences !== this.dynamicForm?.value),
      map((preferences: Preferences) => {
        if (preferences) {
          return cloneObject(preferences);
        }
        return {} as any;
      }),
    );
  }

  setPreferences(preferences: Preferences): void {
    this.store.dispatch(new SetPreferences(preferences));
  }
}
