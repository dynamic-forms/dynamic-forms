import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { DynamicFormInputMaskOptions } from './dynamic-form-input-mask';
import { DynamicFormInputMaskControl } from './dynamic-form-input-mask-control';
import { DynamicFormInputMaskDirective } from './dynamic-form-input-mask.directive';

@Component({
  standalone: true,
  template: '<input [dynamicFormInputMask]="inputMask">',
  imports: [DynamicFormInputMaskDirective],
})
export class DynamicFormInputMaskTestComponent {
  @ViewChild(DynamicFormInputMaskDirective)
  inputMaskDirective: DynamicFormInputMaskDirective;

  @Input()
  inputMask: DynamicFormInputMaskControl;
}

describe('DynamicFormInputMaskDirective', () => {
  let nativeElement: HTMLInputElement;
  let directive: DynamicFormInputMaskDirective;

  describe('without TestBed', () => {
    beforeEach(() => {
      nativeElement = { style: {} } as HTMLInputElement;
      directive = new DynamicFormInputMaskDirective({ nativeElement });
    });

    describe('afterViewInit', () => {
      it('masks input element', () => {
        const maskOptionChanges$ = EMPTY as Observable<Partial<DynamicFormInputMaskOptions>>;
        const control = { maskOptionChanges$, maskInputElement: _ => {} } as DynamicFormInputMaskControl;

        spyOn(control, 'maskInputElement');

        directive.control = control;
        directive.ngAfterViewInit();

        expect(control.maskInputElement).toHaveBeenCalledOnceWith(nativeElement);
      });

      it('subscribes to maskOptionChanges$', () => {
        const maskOptionSubject = new BehaviorSubject<Partial<DynamicFormInputMaskOptions>>({});
        const maskOptionChanges$ = maskOptionSubject.asObservable();
        const control = { maskOptionChanges$, maskInputElement: _ => {}, removeInputElement: () => {} } as DynamicFormInputMaskControl;

        spyOn(control, 'maskInputElement');
        spyOn(control, 'removeInputElement');

        directive.control = control;
        directive.ngAfterViewInit();

        expect(control.maskInputElement).toHaveBeenCalledWith(nativeElement);
        expect(control.removeInputElement).toHaveBeenCalledTimes(1);
      });

      it('subscribes to maskOptionChanges$ and handles rightAlign being set to false', () => {
        const maskOptionSubject = new BehaviorSubject<Partial<DynamicFormInputMaskOptions>>({ rightAlign: false });
        const maskOptionChanges$ = maskOptionSubject.asObservable();
        const control = { maskOptionChanges$, maskInputElement: _ => {}, removeInputElement: () => {} } as DynamicFormInputMaskControl;

        directive.control = control;
        directive.ngAfterViewInit();

        expect(nativeElement.style.textAlign).toBe('left');
      });
    });

    describe('ngOnChanges', () => {
      it('unsubscribes from maskOptionChanges$', () => {
        const subscription = { unsubscribe: () => {} } as any;
        const observable = { subscribe: () => subscription } as any;
        const control = { maskOptionChanges$: { pipe: _ => observable } as any, maskInputElement: _ => {} } as DynamicFormInputMaskControl;

        const observableNew = { subscribe: () => {} } as any;
        const controlNew = {
          maskOptionChanges$: { pipe: () => observableNew } as any,
          maskInputElement: _ => {},
        } as DynamicFormInputMaskControl;

        spyOn(subscription, 'unsubscribe');
        spyOn(observableNew, 'subscribe');

        directive.control = control;
        directive.ngAfterViewInit();

        directive.control = controlNew;
        directive.ngOnChanges({ control: { firstChange: false } as any });

        expect(subscription.unsubscribe).toHaveBeenCalledTimes(1);
        expect(observableNew.subscribe).toHaveBeenCalledTimes(1);
      });
    });

    describe('ngOnDestroy', () => {
      it('unsubscribes from maskOptionChanges$', () => {
        const subscription = { unsubscribe: () => {} } as any;
        const observable = { subscribe: () => subscription } as any;
        const control = { maskOptionChanges$: { pipe: _ => observable } as any, maskInputElement: _ => {} } as DynamicFormInputMaskControl;

        spyOn(subscription, 'unsubscribe');

        directive.control = control;
        directive.ngAfterViewInit();
        directive.ngOnDestroy();

        expect(subscription.unsubscribe).toHaveBeenCalledTimes(1);
      });
    });

    describe('writeValue', () => {
      it('sets value of native element', () => {
        directive.writeValue('value');
        expect(nativeElement.value).toBe('value');
      });

      const values = [undefined, null, 0, false, ''];
      values.forEach(value =>
        it(`sets value of native element to empty string if value is ${value}`, () => {
          directive.writeValue(value);
          expect(nativeElement.value).toBe('');
        }),
      );
    });

    describe('registerOnChange', () => {
      it('registers handler to handle value changes onInput', () => {
        const handler = { onChange: _ => {} };
        spyOn(handler, 'onChange');

        directive.registerOnChange(handler.onChange);
        directive.onInput('value');

        expect(handler.onChange).toHaveBeenCalledWith('value');
      });
    });
  });

  describe('with TestBed', () => {
    let fixture: ComponentFixture<DynamicFormInputMaskTestComponent>;
    let component: DynamicFormInputMaskTestComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(DynamicFormInputMaskTestComponent);
      component = fixture.componentInstance;
      component.inputMask = {
        maskOptionChanges$: EMPTY as Observable<Partial<DynamicFormInputMaskOptions>>,
        maskInputElement: _ => {},
      } as DynamicFormInputMaskControl;
    });

    it('value of input event is passed to onInput', () => {
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

      spyOn(component.inputMaskDirective, 'onInput').and.callThrough();

      inputElement.value = 'value';
      inputElement.dispatchEvent(new Event('input'));

      expect(component.inputMaskDirective.onInput).toHaveBeenCalledOnceWith('value');
    });
  });
});
