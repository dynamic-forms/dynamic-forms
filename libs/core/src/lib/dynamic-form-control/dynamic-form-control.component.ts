import { NgClass } from '@angular/common';
import { Component, DoCheck, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlBase } from './dynamic-form-control-base';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';

@Component({
  selector: 'dynamic-form-control',
  imports: [NgClass],
  templateUrl: './dynamic-form-control.component.html',
})
export class DynamicFormControlComponent<
    Value = any,
    Input extends DynamicFormInput<Value> = DynamicFormInput<Value>,
    Template extends DynamicFormControlTemplate<Value, Input> = DynamicFormControlTemplate<Value, Input>,
    Definition extends DynamicFormControlDefinition<Value, Input, Template> = DynamicFormControlDefinition<Value, Input, Template>,
    Control extends DynamicFormControl<Value, Input, Template, Definition> = DynamicFormControl<Value, Input, Template, Definition>,
  >
  extends DynamicFormControlBase<Value, Input, Template, Definition, Control>
  implements OnInit, DoCheck
{
  private _initialized: boolean;
  private _inputType: string;

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  constructor(
    protected builder: DynamicFormBuilder,
    protected componentFactory: DynamicFormComponentFactory,
    protected override validationService: DynamicFormValidationService,
  ) {
    super(validationService);
  }

  ngOnInit(): void {
    this.initContainer();
  }

  ngDoCheck(): void {
    if (this._initialized && this._inputType !== this.inputType) {
      this.updateContainer();
    }
  }

  private initContainer(): void {
    this._initialized = true;
    this._inputType = this.inputType;
    this.componentFactory.createInputComponent(this.container, this.field);
  }

  private updateContainer(): void {
    this.container.clear();
    this.field = this.builder.recreateFormControl(this.field, this._inputType);
    this.initContainer();
  }
}
