import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialFormModule } from '../../form/material/material-form.module';
import { FormEditorBase } from '../form-editor-base';
import { FormEditorLoggerModule } from '../form-editor-logger.module';
import { FormEditorComponent } from '../form-editor.component';

@Component({
  standalone: true,
  selector: 'app-material-editor',
  templateUrl: './material-editor.component.html',
  imports: [CommonModule, FormEditorComponent, FormEditorLoggerModule, MaterialFormModule],
})
export class MaterialEditorComponent extends FormEditorBase {
  constructor(
    protected override route: ActivatedRoute,
    protected override cdr: ChangeDetectorRef,
  ) {
    super(route, cdr);
  }
}
