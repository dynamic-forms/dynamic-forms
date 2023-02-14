import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormEditorBase } from '../form-editor-base';

@Component({
  selector: 'app-bootstrap-editor',
  templateUrl: './bootstrap-editor.component.html',
})
export class BootstrapEditorComponent extends FormEditorBase {
  constructor(protected override route: ActivatedRoute, protected override cdr: ChangeDetectorRef) {
    super(route, cdr);
  }
}
