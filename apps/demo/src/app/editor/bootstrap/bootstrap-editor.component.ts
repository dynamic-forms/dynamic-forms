import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BootstrapFormComponent } from '../../form/bootstrap/bootstrap-form.component';
import { FormEditorBase } from '../form-editor-base';
import { FormEditorLoggerModule } from '../form-editor-logger.module';
import { FormEditorComponent } from '../form-editor.component';

@Component({
  standalone: true,
  selector: 'app-bootstrap-editor',
  templateUrl: './bootstrap-editor.component.html',
  imports: [FormEditorComponent, FormEditorLoggerModule, BootstrapFormComponent],
})
export class BootstrapEditorComponent extends FormEditorBase {
  constructor(
    protected override route: ActivatedRoute,
    protected override cdr: ChangeDetectorRef,
  ) {
    super(route, cdr);
  }
}
