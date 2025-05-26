import { Component, OnInit, ViewChild } from '@angular/core';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import {
  DynamicFormBuilder,
  DynamicFormElementComponent,
  DynamicFormFileBase,
  DynamicFormFileDirective,
  DynamicFormValidationService,
} from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-file',
  imports: [ReactiveFormsModule, DynamicFormFileDirective, DynamicFormElementComponent, MatInputModule, MatFormFieldModule],
  templateUrl: './dynamic-form-file.component.html',
})
export class MatDynamicFormFileComponent extends DynamicFormFileBase implements OnInit {
  @ViewChild(MatInput, { static: true })
  protected _matInput: MatInput;

  @ViewChild(NgControl, { static: true })
  protected _ngControl: NgControl;

  constructor(
    protected override builder: DynamicFormBuilder,
    protected override validationService: DynamicFormValidationService,
  ) {
    super(builder, validationService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this._matInput.ngControl = this._ngControl;
    this._matInput['_errorStateTracker'].ngControl = this._ngControl;
  }
}
