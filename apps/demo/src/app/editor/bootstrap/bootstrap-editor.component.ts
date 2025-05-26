import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BootstrapFormComponent } from '../../form/bootstrap/bootstrap-form.component';
import { FormEditorBase } from '../form-editor-base';
import { FormEditorComponent } from '../form-editor.component';

@Component({
  selector: 'app-bootstrap-editor',
  imports: [FormEditorComponent, BootstrapFormComponent],
  templateUrl: './bootstrap-editor.component.html',
})
export class BootstrapEditorComponent extends FormEditorBase {
  constructor(
    protected override route: ActivatedRoute,
    protected override cdr: ChangeDetectorRef,
  ) {
    super(route, cdr);
  }
}
