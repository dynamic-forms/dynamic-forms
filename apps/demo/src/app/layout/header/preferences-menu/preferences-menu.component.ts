import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { cloneObject, DynamicFormComponent, DynamicFormDefinition } from '@dynamic-forms/core';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SetPreferences } from '../../../state/preferences/preferences.actions';
import { Preferences } from '../../../state/preferences/preferences.model';
import { PreferencesState } from '../../../state/preferences/preferences.state';
import * as preferencesDefinition from './preferences-form.json';

@Component({
  selector: 'app-preferences-menu',
  templateUrl: './preferences-menu.component.html',
  styleUrls: ['./preferences-menu.component.scss'],
})
export class PreferencesMenuComponent implements AfterViewInit, OnDestroy {
  readonly subscriptions = new Subscription();
  readonly definition: DynamicFormDefinition = preferencesDefinition;
  readonly model$: Observable<Preferences>;

  @ViewChild(DynamicFormComponent)
  dynamicForm: DynamicFormComponent;

  constructor(private store: Store) {
    this.model$ = this.store.select(PreferencesState).pipe(
      filter((preferences) => preferences !== this.dynamicForm?.formGroup.value),
      map((preferences: Preferences) => {
        if (preferences) {
          return cloneObject(preferences);
        }
        return {} as any;
      }),
    );
  }

  ngAfterViewInit(): void {
    this.subscriptions.add(this.dynamicForm.formGroup.valueChanges.subscribe((preferences: Preferences) => {
      const action = new SetPreferences(preferences);
      this.store.dispatch(action);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
