import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { DynamicFormInputMaskControl } from './dynamic-form-input-mask-control';

@Directive({
  standalone: true,
  selector: '[dynamicFormInputMask]',
  exportAs: 'dynamicFormInputMask',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: DynamicFormInputMaskDirective, multi: true }],
})
export class DynamicFormInputMaskDirective implements ControlValueAccessor, AfterViewInit, OnChanges, OnDestroy {
  private _maskOptionChanges: Subscription;
  protected _onChange: any;
  protected _onTouched: any;

  @Input('dynamicFormInputMask')
  control: DynamicFormInputMaskControl;

  constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event.target.value'])
  onInput = (_: any) => {};

  ngAfterViewInit(): void {
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
    this.nativeElement.value = value || '';
  }

  registerOnChange(onChange: any): void {
    this._onChange = onChange;
    this.onInput = value => this._onChange(value);
  }

  registerOnTouched(onTouched: any): void {
    this._onTouched = onTouched;
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
          if (options.rightAlign === false) {
            this.nativeElement.style.textAlign = 'left';
          }
        }),
      )
      .subscribe();
  }
}
