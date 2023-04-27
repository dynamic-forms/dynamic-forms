import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { DynamicFormBuilder, DynamicFormElementComponent, DynamicFormFileBase, DynamicFormFileDirective,
  DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  standalone: true,
  selector: 'mat-dynamic-form-file',
  templateUrl: './dynamic-form-file.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormFileDirective,
    DynamicFormElementComponent,
    MatInputModule,
    MatFormFieldModule,
  ],
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
