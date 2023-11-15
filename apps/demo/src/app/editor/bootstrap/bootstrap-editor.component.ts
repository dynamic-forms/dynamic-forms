import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BootstrapFormModule } from '../../form/bootstrap/bootstrap-form.module';
import { FormEditorBase } from '../form-editor-base';
import { FormEditorLoggerModule } from '../form-editor-logger.module';
import { FormEditorComponent } from '../form-editor.component';

@Component({
  standalone: true,
  selector: 'app-bootstrap-editor',
  templateUrl: './bootstrap-editor.component.html',
  imports: [CommonModule, FormEditorComponent, FormEditorLoggerModule, BootstrapFormModule],
})
export class BootstrapEditorComponent extends FormEditorBase {
  constructor(
    protected override route: ActivatedRoute,
    protected override cdr: ChangeDetectorRef,
  ) {
    super(route, cdr);
  }
}
