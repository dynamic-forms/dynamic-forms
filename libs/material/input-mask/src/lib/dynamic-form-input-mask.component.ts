import { Component, OnInit, ViewChild } from '@angular/core';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { DynamicFormElementComponent, DynamicFormValidationService } from '@dynamic-forms/core';
import { DynamicFormInputMaskBase, DynamicFormInputMaskDirective } from '@dynamic-forms/core/input-mask';

@Component({
  selector: 'mat-dynamic-form-input-mask',
  templateUrl: './dynamic-form-input-mask.component.html',
  imports: [ReactiveFormsModule, DynamicFormInputMaskDirective, DynamicFormElementComponent, MatInputModule, MatFormFieldModule],
})
export class MatDynamicFormInputMaskComponent extends DynamicFormInputMaskBase implements OnInit {
  @ViewChild(MatInput, { static: true })
  protected _matInput: MatInput;

  @ViewChild(NgControl, { static: true })
  protected _ngControl: NgControl;

  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }

  ngOnInit(): void {
    this._matInput.ngControl = this._ngControl;
    this._matInput['_errorStateTracker'].ngControl = this._ngControl;
  }
}
