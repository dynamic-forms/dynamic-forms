import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { DynamicFormInputMaskOptions } from './dynamic-form-input-mask';
import { DynamicFormInputMaskControl } from './dynamic-form-input-mask-control';
import { DynamicFormInputMaskConverter } from './dynamic-form-input-mask-converter';
import { DynamicFormInputMaskConverterService } from './dynamic-form-input-mask-converter.service';

@Directive({
  standalone: true,
  selector: '[dynamicFormInputMask]',
  exportAs: 'dynamicFormInputMask',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: DynamicFormInputMaskDirective, multi: true }],
})
export class DynamicFormInputMaskDirective implements ControlValueAccessor, AfterViewInit, OnChanges, OnDestroy {
  private readonly __maskConverterOptionKeys = ['alias', 'digits', 'radixPoint', 'groupSeparator', 'prefix', 'suffix'];
  private _rawValue: any;
  private _formattedValue: any;
  private _maskConverterInitialized = false;
  private _maskConverter: DynamicFormInputMaskConverter;
  private _maskOptionChanges: Subscription;
  protected _onChange: any;
  protected _onTouched: any;

  @Input('dynamicFormInputMask')
  control: DynamicFormInputMaskControl;

  constructor(
    private readonly elementRef: ElementRef<HTMLInputElement>,
    private readonly converterService: DynamicFormInputMaskConverterService,
  ) {
    this._maskConverter = this.converterService.defaultConverter;
  }

  @HostListener('input', ['$event.target.value'])
  onInput = (_: any) => {};

  ngAfterViewInit(): void {
    this.initInputMaskConverter();
    this.initInputMask();
  }

  ngOnChanges({ control }: SimpleChanges): void {
    if (control && !control.firstChange) {
      this._maskOptionChanges?.unsubscribe();
      this.initInputMask();
    }
  }

  ngOnDestroy(): void {
    this._maskOptionChanges?.unsubscribe();
  }

  writeValue(value: any): void {
    this._rawValue = value;
    this.writeFormattedValue(value);
  }

  registerOnChange(onChange: any): void {
    this._onChange = onChange;
    this.onInput = value => {
      this._rawValue = value;
      const parsedValue = this._maskConverter.parse(value, this.control.maskOptions);
      this._onChange(parsedValue);
    };
  }

  registerOnTouched(onTouched: any): void {
    this._onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nativeElement.disabled = isDisabled;
  }

  private get nativeElement(): HTMLInputElement {
    return this.elementRef.nativeElement;
  }

  private initInputMask(): void {
    this.control.maskInputElement(this.nativeElement);
    this._maskOptionChanges = this.control.maskOptionChanges$
      .pipe(
        tap(options => {
          this.control.removeInputElement();
          this.control.maskInputElement(this.nativeElement);
          this.updateInputMaskConverter(options);
          this.writeFormattedValue(this._rawValue);
          if (options.rightAlign === false) {
            this.nativeElement.style.textAlign = 'left';
          }
        }),
      )
      .subscribe();
  }

  private getInputMaskConverter(): DynamicFormInputMaskConverter {
    return this.converterService.getConverter(this.control.maskOptions);
  }

  private initInputMaskConverter(): void {
    const maskConverter = this.getInputMaskConverter();
    if (this._maskConverter !== maskConverter) {
      this._maskConverter = maskConverter;
    }
    this._maskConverterInitialized = true;
    this.writeFormattedValue(this._rawValue);
  }

  private updateInputMaskConverter(optionChanges: Partial<DynamicFormInputMaskOptions>): void {
    if (!Object.keys(optionChanges).some(key => this.__maskConverterOptionKeys.includes(key))) {
      return;
    }
    this._maskConverter = optionChanges.alias ? this.getInputMaskConverter() : this._maskConverter;
  }

  private writeFormattedValue(value: any): void {
    if (!this._maskConverterInitialized) {
      return;
    }

    this._formattedValue = this._maskConverter.format(value, this.control.maskOptions);
    this.nativeElement.value = this._formattedValue || '';
  }
}
