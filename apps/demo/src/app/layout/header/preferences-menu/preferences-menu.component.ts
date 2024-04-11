import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { cloneObject } from '@dynamic-forms/core';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FormData } from '../../../form/form-data';
import { MaterialFormComponent } from '../../../form/material/material-form.component';
import { SetPreferences } from '../../../state/preferences/preferences.actions';
import { Preferences } from '../../../state/preferences/preferences.model';
import { PreferencesState } from '../../../state/preferences/preferences.state';
import preferencesDefinition from './preferences-form.json';

@Component({
  standalone: true,
  selector: 'app-preferences-menu',
  templateUrl: './preferences-menu.component.html',
  styleUrl: './preferences-menu.component.scss',
  imports: [AsyncPipe, MatButtonModule, MatIconModule, MatMenuModule, MaterialFormComponent],
})
export class PreferencesMenuComponent implements AfterViewInit, OnDestroy {
  private _subscriptions = new Subscription();
  readonly model$: Observable<Preferences>;
  readonly data$: Observable<FormData<Preferences>>;

  @ViewChild(MaterialFormComponent)
  dynamicForm: MaterialFormComponent;

  constructor(private store: Store) {
    this.model$ = this.store.select(PreferencesState).pipe(
      filter(preferences => preferences !== this.dynamicForm?.form.value),
      map((preferences: Preferences) => {
        if (preferences) {
          return cloneObject(preferences);
        }
        return {} as any;
      }),
    );
    this.data$ = this.model$.pipe(
      map(model => {
        return { definition: preferencesDefinition, model };
      }),
    );
  }

  ngAfterViewInit(): void {
    this._subscriptions.add(
      this.dynamicForm.form.valueChange.subscribe(preferences => {
        this.setPreferences(preferences);
      }),
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private setPreferences(preferences: Preferences): void {
    this.store.dispatch(new SetPreferences(preferences));
  }
}
