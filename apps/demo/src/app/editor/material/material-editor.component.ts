import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialFormComponent } from '../../form/material/material-form.component';
import { FormEditorBase } from '../form-editor-base';
import { FormEditorComponent } from '../form-editor.component';

@Component({
  selector: 'app-material-editor',
  imports: [FormEditorComponent, MaterialFormComponent],
  templateUrl: './material-editor.component.html',
})
export class MaterialEditorComponent extends FormEditorBase {
  constructor(
    protected override route: ActivatedRoute,
    protected override cdr: ChangeDetectorRef,
  ) {
    super(route, cdr);
  }
}
