import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialFormComponent } from '../../form/material/material-form.component';
import { FormEditorBase } from '../form-editor-base';
import { FormEditorLoggerModule } from '../form-editor-logger.module';
import { FormEditorComponent } from '../form-editor.component';

@Component({
  standalone: true,
  selector: 'app-material-editor',
  templateUrl: './material-editor.component.html',
  imports: [NgIf, FormEditorComponent, FormEditorLoggerModule, MaterialFormComponent],
})
export class MaterialEditorComponent extends FormEditorBase {
  constructor(
    protected override route: ActivatedRoute,
    protected override cdr: ChangeDetectorRef,
  ) {
    super(route, cdr);
  }
}
