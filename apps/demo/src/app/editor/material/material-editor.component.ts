import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormEditorBase } from '../form-editor-base';

@Component({
  selector: 'app-material-editor',
  templateUrl: './material-editor.component.html',
})
export class MaterialEditorComponent extends FormEditorBase {
  constructor(protected override route: ActivatedRoute, protected override cdr: ChangeDetectorRef) {
    super(route, cdr);
  }
}
