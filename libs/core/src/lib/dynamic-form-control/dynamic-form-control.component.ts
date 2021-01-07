import { Component, DoCheck, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlBase } from './dynamic-form-control-base';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlHints } from './dynamic-form-control-hints';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';

@Component({
  selector: 'dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html'
})
export class DynamicFormControlComponent<
  Input extends DynamicFormInput = DynamicFormInput,
  Template extends DynamicFormControlTemplate<Input> = DynamicFormControlTemplate<Input>,
  Definition extends DynamicFormControlDefinition<Input, Template> = DynamicFormControlDefinition<Input, Template>,
  Control extends DynamicFormControl<Input, Template, Definition> = DynamicFormControl<Input, Template, Definition>
> extends DynamicFormControlBase<Input, Template, Definition, Control> implements OnInit, DoCheck {

  private initialized: boolean;
  private inputType: string;

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  constructor(
    protected componentFactory: DynamicFormComponentFactory,
    protected validationService: DynamicFormValidationService
  ) {
    super(validationService);
  }

  get input(): Input { return this.field.template.input; }
  get hints(): DynamicFormControlHints { return this.field.template.hints; }

  ngOnInit(): void {
    this.initContainer();
  }

  ngDoCheck(): void {
    if (this.initialized && this.field.inputType !== this.inputType) {
      this.updateContainer();
    }
  }

  private initContainer(): void {
    this.initialized = true;
    this.inputType = this.field.inputType;
    this.componentFactory.createInputComponent(this.container, this.field);
  }

  private updateContainer(): void {
    this.container.clear();
    this.initContainer();
  }
}
