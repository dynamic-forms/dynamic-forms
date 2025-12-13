import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { PreferencesState } from '../../state/preferences/preferences.state';
import { FormBase } from '../form-base';
import { BootstrapFormModule } from './bootstrap-form.module';

@Component({
  selector: 'app-bootstrap-form',
  imports: [BootstrapFormModule, AsyncPipe],
  templateUrl: './bootstrap-form.component.html',
})
export class BootstrapFormComponent extends FormBase {
  readonly theme$ = inject(Store).select(PreferencesState.themeClass);
}
