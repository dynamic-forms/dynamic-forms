import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MaterialFormModule } from '../../form/material/material-form.module';
import { FormExampleBase } from '../form-example-base';
import { FormExampleComponent } from '../form-example.component';

@Component({
  standalone: true,
  selector: 'app-material-examples',
  templateUrl: './material-examples.component.html',
  imports: [CommonModule, FormExampleComponent, MaterialFormModule],
})
export class MaterialExamplesComponent extends FormExampleBase {
  constructor(
    protected override route: ActivatedRoute,
    protected override dialog: MatDialog,
  ) {
    super(route, dialog);
  }
}
