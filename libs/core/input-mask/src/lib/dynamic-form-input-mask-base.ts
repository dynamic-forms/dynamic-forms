import { Directive, DoCheck, ViewChild } from '@angular/core';
import { DynamicFormInputBase, DynamicFormValidationService } from '@dynamic-forms/core';
import { DynamicFormInputMask, DynamicFormInputMaskDefinition, DynamicFormInputMaskTemplate } from './dynamic-form-input-mask';
import { DynamicFormInputMaskControl } from './dynamic-form-input-mask-control';
import { DynamicFormInputMaskDirective } from './dynamic-form-input-mask.directive';

@Directive({})
export abstract class DynamicFormInputMaskBase
  extends DynamicFormInputBase<
    DynamicFormInputMask,
    DynamicFormInputMaskTemplate,
    DynamicFormInputMaskDefinition,
    DynamicFormInputMaskControl
  >
  implements DoCheck
{
  @ViewChild(DynamicFormInputMaskDirective)
  protected _maskInput: DynamicFormInputMaskDirective;

  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
    this.field;
  }

  get inputMask(): DynamicFormInputMaskControl {
    return this.field;
  }

  ngDoCheck(): void {
    this.field.check();
  }
}
