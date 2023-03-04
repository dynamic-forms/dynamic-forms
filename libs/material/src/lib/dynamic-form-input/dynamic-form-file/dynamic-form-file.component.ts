import { Component, OnInit, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { DynamicFormBuilder, DynamicFormFileBase, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-file',
  templateUrl: './dynamic-form-file.component.html',
})
export class MatDynamicFormFileComponent extends DynamicFormFileBase implements OnInit {
  @ViewChild(MatInput, { static: true })
  protected _matInput: MatInput;

  @ViewChild(NgControl, { static: true })
  protected _ngControl: NgControl;

  constructor(protected override builder: DynamicFormBuilder, protected override validationService: DynamicFormValidationService) {
    super(builder, validationService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    Object.defineProperty(this._matInput, 'ngControl', { get: () => this._ngControl });
  }
}
