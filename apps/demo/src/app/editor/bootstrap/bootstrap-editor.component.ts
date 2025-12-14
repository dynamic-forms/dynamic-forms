import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BootstrapFormComponent } from '../../form/bootstrap/bootstrap-form.component';
import { FormEditorBase } from '../form-editor-base';
import { FormEditorComponent } from '../form-editor.component';

@Component({
  selector: 'app-bootstrap-editor',
  imports: [FormEditorComponent, BootstrapFormComponent],
  templateUrl: './bootstrap-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BootstrapEditorComponent extends FormEditorBase {}
