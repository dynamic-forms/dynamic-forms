import { AsyncPipe } from '@angular/common';
import { Component, NgModule, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DynamicFormComponent, DynamicFormDefinition, cloneObject } from '@dynamic-forms/core';
import { MatDynamicFormsModule } from '@dynamic-forms/material';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { v4 } from 'uuid';
import { SetPreferences } from '../../../state/preferences/preferences.actions';
import { Preferences } from '../../../state/preferences/preferences.model';
import { PreferencesState } from '../../../state/preferences/preferences.state';
import preferencesDefinition from './preferences-form.json';

@NgModule({
  imports: [
    MatDynamicFormsModule.forRoot({
      theme: 'material',
      idBuilder: { createId: () => v4() },
    }),
  ],
  exports: [MatDynamicFormsModule],
})
export class PreferencesMenuModule {}

@Component({
  standalone: true,
  selector: 'app-preferences-menu',
  templateUrl: './preferences-menu.component.html',
  styleUrl: './preferences-menu.component.scss',
  imports: [AsyncPipe, MatButtonModule, MatIconModule, MatMenuModule, PreferencesMenuModule],
})
export class PreferencesMenuComponent {
  readonly definition: DynamicFormDefinition = preferencesDefinition;
  readonly model$: Observable<Preferences>;

  @ViewChild(DynamicFormComponent)
  dynamicForm: DynamicFormComponent;

  constructor(private store: Store) {
    this.model$ = this.store.select(PreferencesState).pipe(
      filter(preferences => preferences !== this.dynamicForm?.value),
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
