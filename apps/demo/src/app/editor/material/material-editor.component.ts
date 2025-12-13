import { Component } from '@angular/core';
import { MaterialFormComponent } from '../../form/material/material-form.component';
import { FormEditorBase } from '../form-editor-base';
import { FormEditorComponent } from '../form-editor.component';

@Component({
  selector: 'app-material-editor',
  imports: [FormEditorComponent, MaterialFormComponent],
  templateUrl: './material-editor.component.html',
})
export class MaterialEditorComponent extends FormEditorBase {}
