import { DynamicForm, DynamicFormBuilder, DynamicFormElement, DynamicFormFieldType, DynamicFormInputControl } from '@dynamic-forms/core';
import _Inputmask from 'inputmask';
import type Inputmask from 'inputmask';
import { Subject } from 'rxjs';
import { DynamicFormInputMask, DynamicFormInputMaskDefinition, DynamicFormInputMaskOptions } from './dynamic-form-input-mask';

const InputmaskConstructor = (_Inputmask as unknown as { default?: Inputmask.Static }).default || _Inputmask;

export interface DynamicFormInputMaskInstance extends Inputmask.Instance {
  opts: DynamicFormInputMaskOptions;
}

export class DynamicFormInputMaskControl extends DynamicFormInputControl<DynamicFormInputMask> {
  private readonly _maskOptionChanges = new Subject<Partial<DynamicFormInputMaskOptions>>();
  protected readonly _mask: DynamicFormInputMaskInstance;
  protected _maskOptions: DynamicFormInputMaskOptions;
  readonly maskOptionChanges$ = this._maskOptionChanges.asObservable();

  constructor(
    builder: DynamicFormBuilder,
    root: DynamicForm,
    parent: DynamicFormElement,
    definition: DynamicFormInputMaskDefinition,
    type: DynamicFormFieldType,
  ) {
    super(builder, root, parent, definition, type);
    this._maskOptions = this.evaluateMaskOptions();
    this._mask = new InputmaskConstructor(this._maskOptions) as DynamicFormInputMaskInstance;
  }

  override check(): void {
    this.checkOptions();
    super.check();
  }

  get mask(): DynamicFormInputMaskInstance {
    return this._mask;
  }

  get maskOptions(): DynamicFormInputMaskOptions {
    return this._maskOptions;
  }

  maskInputElement(inputElement: HTMLInputElement): void {
    this._mask.mask(inputElement);
  }

  removeInputElement(): void {
    this._mask.remove();
  }

  private checkOptions(): void {
    if (!this._maskOptions) {
      return;
    }

    const maskOptions = this.evaluateMaskOptions();
    const maskOptionChanges = Object.entries(maskOptions).reduce((result, [key, value]) => {
      if (this._maskOptions[key] !== value) {
        result[key] = value;
      }
      return result;
    }, {});

    if (!Object.keys(maskOptionChanges).length) {
      return;
    }

    this._maskOptions = maskOptions;
    this._mask.option(maskOptionChanges);
    this._maskOptionChanges.next(maskOptionChanges);
  }

  private evaluateMaskOptions(): DynamicFormInputMaskOptions {
    const maskOptions = this.template.input.maskOptions;
    if (!maskOptions) {
      return undefined;
    }

    const descriptors = Object.entries(Object.getOwnPropertyDescriptors(maskOptions));
    const getters = descriptors.filter(([_, property]) => !!property.get).map(([key]) => key);
    return getters.reduce(
      (result, key) => {
        const value = maskOptions[key];
        result[key] = value;
        return result;
      },
      { ...maskOptions } as DynamicFormInputMaskOptions,
    );
  }
}
