import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ThemeClass } from '../../state/preferences/preferences.model';
import { PreferencesState } from '../../state/preferences/preferences.state';
import { FormBase } from '../form-base';
import { BootstrapFormModule } from './bootstrap-form.module';

@Component({
  selector: 'app-bootstrap-form',
  imports: [BootstrapFormModule, AsyncPipe],
  templateUrl: './bootstrap-form.component.html',
})
export class BootstrapFormComponent extends FormBase {
  readonly theme$: Observable<ThemeClass>;

  constructor(
    private store: Store,
    protected override dialog: MatDialog,
  ) {
    super(dialog);
    this.theme$ = this.store.select(PreferencesState.themeClass);
  }
}
