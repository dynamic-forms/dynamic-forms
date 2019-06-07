import { AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldWrapper} from '../dynamic-form-field/dynamic-form-field-wrapper';

export abstract class DynamicFormWrapper<
  Field extends DynamicFormField = DynamicFormField
> extends DynamicFormFieldWrapper<Field> implements AfterViewInit {

  fieldComponent: DynamicFormWrapper<Field> | DynamicFormFieldWrapper<Field>;

  @ViewChild('fieldContainer', { read: ViewContainerRef, static: true })
  fieldContainer: ViewContainerRef;

  constructor(protected containerRef: ViewContainerRef) {
    super();
  }

  get ref() { return this.containerRef; }

  ngAfterViewInit() {
    const viewRef = this.containerRef.detach(0);
    this.fieldContainer.insert(viewRef);
  }
}
