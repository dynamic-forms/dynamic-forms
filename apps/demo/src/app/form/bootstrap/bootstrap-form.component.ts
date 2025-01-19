import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ThemeService } from '../../services/theme-service';
import { FormBase } from '../form-base';
import { BootstrapFormModule } from './bootstrap-form.module';

@Component({
  selector: 'app-bootstrap-form',
  templateUrl: './bootstrap-form.component.html',
  styleUrl: './bootstrap-form.component.scss',
  imports: [BootstrapFormModule, AsyncPipe],
})
export class BootstrapFormComponent extends FormBase {
  readonly theme$: Observable<string>;

  constructor(
    private themeService: ThemeService,
    protected override dialog: MatDialog,
  ) {
    super(dialog);
    this.theme$ = this.themeService.theme$;
  }
}
