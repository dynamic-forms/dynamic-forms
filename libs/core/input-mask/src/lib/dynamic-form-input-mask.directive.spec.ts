import { Component, Directive, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MockService } from 'ng-mocks';
import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { DynamicFormInputMaskOptions } from './dynamic-form-input-mask';
import { DynamicFormInputMaskControl } from './dynamic-form-input-mask-control';
import { DynamicFormInputMaskConverter } from './dynamic-form-input-mask-converter';
import { DynamicFormInputMaskConverterService } from './dynamic-form-input-mask-converter.service';
import { DynamicFormInputMaskDirective } from './dynamic-form-input-mask.directive';

@Directive()
export abstract class DynamicFormInputMaskTestComponentBase {
  @ViewChild(DynamicFormInputMaskDirective)
  inputMaskDirective: DynamicFormInputMaskDirective;

  @Input()
  inputMask: DynamicFormInputMaskControl;
}

@Component({
  selector: 'dynamic-form-input-mask-test',
  imports: [DynamicFormInputMaskDirective, ReactiveFormsModule],
  template: '<input [dynamicFormInputMask]="inputMask" [formControl]="inputMask.control">',
})
export class DynamicFormInputMaskTestComponent extends DynamicFormInputMaskTestComponentBase {}

@Component({
  selector: 'dynamic-form-input-mask-test-without-form-control',
  imports: [DynamicFormInputMaskDirective],
  template: '<input [dynamicFormInputMask]="inputMask">',
})
export class DynamicFormInputMaskTestWithoutFormControlComponent extends DynamicFormInputMaskTestComponentBase {}

describe('DynamicFormInputMaskDirective', () => {
  let nativeElement: HTMLInputElement;
  let directive: DynamicFormInputMaskDirective;
  let converterService: DynamicFormInputMaskConverterService;
  let defaultConverter: DynamicFormInputMaskConverter;

  describe('without TestBed', () => {
    beforeEach(() => {
      nativeElement = { style: {} } as HTMLInputElement;
      defaultConverter = { parse: value => value, format: value => value };
      converterService = MockService(DynamicFormInputMaskConverterService, { defaultConverter, getConverter: _ => defaultConverter });
      directive = new DynamicFormInputMaskDirective({ nativeElement }, converterService);
    });

    describe('afterViewInit', () => {
      it('inits input mask converter and writes formatted value using default converter', () => {
        const maskOptions = {} as DynamicFormInputMaskOptions;
        const maskOptionChanges$ = EMPTY as Observable<Partial<DynamicFormInputMaskOptions>>;
        const control = { maskOptions, maskOptionChanges$, maskInputElement: _ => {} } as DynamicFormInputMaskControl;

        const getConverterSpy = spyOn(converterService, 'getConverter').and.callThrough();
        const defaultConverterFormatSpy = spyOn(defaultConverter, 'format').and.callThrough();

        directive.control = control;
        directive.ngAfterViewInit();

        expect(getConverterSpy).toHaveBeenCalledOnceWith(maskOptions);
        expect(defaultConverterFormatSpy).toHaveBeenCalledOnceWith(undefined, maskOptions);
        expect(nativeElement.value).toBe('');
      });

      it('inits input mask converter and writes formatted value using non-default converter', () => {
        const maskOptions = {} as DynamicFormInputMaskOptions;
        const maskOptionChanges$ = EMPTY as Observable<Partial<DynamicFormInputMaskOptions>>;
        const converter = { parse: value => value, format: value => value } as DynamicFormInputMaskConverter;
        const control = { maskOptions, maskOptionChanges$, maskInputElement: _ => {} } as DynamicFormInputMaskControl;

        const getConverterSpy = spyOn(converterService, 'getConverter').and.returnValue(converter);
        const defaultConverterFormatSpy = spyOn(defaultConverter, 'format').and.callThrough();
        const converterFormatSpy = spyOn(converter, 'format').and.callThrough();

        directive.control = control;
        directive.ngAfterViewInit();

        expect(getConverterSpy).toHaveBeenCalledOnceWith(maskOptions);
        expect(converterFormatSpy).toHaveBeenCalledOnceWith(undefined, maskOptions);
        expect(defaultConverterFormatSpy).toHaveBeenCalledTimes(0);
        expect(nativeElement.value).toBe('');
      });

      it('masks input element', () => {
        const maskOptionChanges$ = EMPTY as Observable<Partial<DynamicFormInputMaskOptions>>;
        const control = { maskOptionChanges$, maskInputElement: _ => {} } as DynamicFormInputMaskControl;

        const maskElementSpy = spyOn(control, 'maskInputElement');

        directive.control = control;
        directive.ngAfterViewInit();

        expect(maskElementSpy).toHaveBeenCalledOnceWith(nativeElement);
      });

      it('subscribes to maskOptionChanges$', () => {
        const maskOptionSubject = new BehaviorSubject<Partial<DynamicFormInputMaskOptions>>({});
        const maskOptionChanges$ = maskOptionSubject.asObservable();
        const control = { maskOptionChanges$, maskInputElement: _ => {}, removeInputElement: () => {} } as DynamicFormInputMaskControl;

        const maskElementSpy = spyOn(control, 'maskInputElement');
        const removeElementSpy = spyOn(control, 'removeInputElement');

        directive.control = control;
        directive.ngAfterViewInit();

        expect(maskElementSpy).toHaveBeenCalledWith(nativeElement);
        expect(removeElementSpy).toHaveBeenCalledTimes(1);
      });

      it('subscribes to maskOptionChanges$ and handles rightAlign being set to false', () => {
        const maskOptionSubject = new Subject<Partial<DynamicFormInputMaskOptions>>();
        const maskOptionChanges$ = maskOptionSubject.asObservable();
        const control = { maskOptionChanges$, maskInputElement: _ => {}, removeInputElement: () => {} } as DynamicFormInputMaskControl;

        directive.control = control;
        directive.ngAfterViewInit();

        maskOptionSubject.next({ rightAlign: false });

        expect(nativeElement.style.textAlign).toBe('left');
      });

      it('subscribes to maskOptionChanges$ and handles converter change', () => {
        const maskOptionSubject = new Subject<Partial<DynamicFormInputMaskOptions>>();
        const maskOptionChanges$ = maskOptionSubject.asObservable();
        const control = {
          maskOptions: { alias: 'ip' },
          maskOptionChanges$,
          maskInputElement: _ => {},
          removeInputElement: () => {},
        } as DynamicFormInputMaskControl;
        const converter = { parse: value => value, format: value => value } as DynamicFormInputMaskConverter;

        const getConverterSpy = spyOn(converterService, 'getConverter').and.returnValues(defaultConverter, converter, defaultConverter);
        const defaultConverterFormatSpy = spyOn(defaultConverter, 'format').and.callThrough();
        const converterFormatSpy = spyOn(converter, 'format').and.callThrough();

        directive.control = control;
        directive.ngAfterViewInit();

        expect(getConverterSpy).toHaveBeenCalledTimes(1);
        expect(defaultConverterFormatSpy).toHaveBeenCalledTimes(1);
        expect(converterFormatSpy).toHaveBeenCalledTimes(0);

        maskOptionSubject.next({ alias: 'integer' });

        expect(getConverterSpy).toHaveBeenCalledTimes(2);
        expect(defaultConverterFormatSpy).toHaveBeenCalledTimes(1);
        expect(converterFormatSpy).toHaveBeenCalledTimes(1);

        maskOptionSubject.next({ suffix: 'suffix' });

        expect(getConverterSpy).toHaveBeenCalledTimes(2);
        expect(defaultConverterFormatSpy).toHaveBeenCalledTimes(1);
        expect(converterFormatSpy).toHaveBeenCalledTimes(2);

        maskOptionSubject.next({ alias: 'ip' });

        expect(getConverterSpy).toHaveBeenCalledTimes(3);
        expect(defaultConverterFormatSpy).toHaveBeenCalledTimes(2);
        expect(converterFormatSpy).toHaveBeenCalledTimes(2);
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
      beforeEach(() => {
        const subscription = { unsubscribe: () => {} } as any;
        const observable = { subscribe: () => subscription } as any;
        const control = {
          maskOptions: {},
          maskOptionChanges$: { pipe: _ => observable } as any,
          maskInputElement: _ => {},
        } as DynamicFormInputMaskControl;

        directive.control = control;
      });

      it('sets value of native element using default converter', () => {
        const defaultConverterFormatSpy = spyOn(defaultConverter, 'format').and.callThrough();

        directive.ngAfterViewInit();
        directive.writeValue('value');

        expect(nativeElement.value).toBe('value');
        expect(defaultConverterFormatSpy).toHaveBeenCalledWith(undefined, directive.control.maskOptions);
        expect(defaultConverterFormatSpy).toHaveBeenCalledWith('value', directive.control.maskOptions);
        expect(defaultConverterFormatSpy).toHaveBeenCalledTimes(2);
      });

      it('sets value of native element using non-default converter', () => {
        const converter = { parse: value => value, format: value => value } as DynamicFormInputMaskConverter;

        const converterFormatSpy = spyOn(converter, 'format').and.callThrough();
        spyOn(converterService, 'getConverter').and.returnValue(converter);

        directive.ngAfterViewInit();
        directive.writeValue('value');

        expect(nativeElement.value).toBe('value');
        expect(converterFormatSpy).toHaveBeenCalledWith(undefined, directive.control.maskOptions);
        expect(converterFormatSpy).toHaveBeenCalledWith('value', directive.control.maskOptions);
        expect(converterFormatSpy).toHaveBeenCalledTimes(2);
      });

      const values = [undefined, null, 0, false, ''];
      values.forEach(value =>
        it(`sets value of native element to empty string if value is ${value}`, () => {
          directive.ngAfterViewInit();
          directive.writeValue(value);
          expect(nativeElement.value).toBe('');
        }),
      );
    });

    describe('registerOnChange', () => {
      beforeEach(() => {
        const subscription = { unsubscribe: () => {} } as any;
        const observable = { subscribe: () => subscription } as any;
        const control = {
          maskOptions: {},
          maskOptionChanges$: { pipe: _ => observable } as any,
          maskInputElement: _ => {},
        } as DynamicFormInputMaskControl;

        directive.control = control;
      });

      it('registers handler to handle value changes onInput using default converter', () => {
        const handler = { onChange: _ => {} };
        const handlerOnChangeSpy = spyOn(handler, 'onChange');
        const defaultConverterParseSpy = spyOn(defaultConverter, 'parse').and.callThrough();

        directive.ngAfterViewInit();
        directive.registerOnChange(handler.onChange);
        directive.onInput('value');

        expect(defaultConverterParseSpy).toHaveBeenCalledOnceWith('value', directive.control.maskOptions);
        expect(handlerOnChangeSpy).toHaveBeenCalledOnceWith('value');
      });

      it('registers handler to handle value changes onInput using non-default converter', () => {
        const handler = { onChange: _ => {} };
        const converter = { parse: value => value, format: value => value } as DynamicFormInputMaskConverter;

        const handlerOnChangeSpy = spyOn(handler, 'onChange');
        const converterParseSpy = spyOn(converter, 'parse').and.callThrough();
        const defaultConverterParseSpy = spyOn(defaultConverter, 'parse').and.callThrough();
        spyOn(converterService, 'getConverter').and.returnValue(converter);

        directive.ngAfterViewInit();
        directive.registerOnChange(handler.onChange);
        directive.onInput('value');

        expect(converterParseSpy).toHaveBeenCalledOnceWith('value', directive.control.maskOptions);
        expect(defaultConverterParseSpy).toHaveBeenCalledTimes(0);
        expect(handlerOnChangeSpy).toHaveBeenCalledOnceWith('value');
      });
    });

    describe('setDisabledState', () => {
      it('sets disabled of input element', () => {
        directive.setDisabledState(true);

        expect(nativeElement.disabled).toBeTrue();

        directive.setDisabledState(false);

        expect(nativeElement.disabled).toBeFalse();
      });
    });
  });

  describe('with TestBed using DynamicFormInputMaskTestComponent', () => {
    let fixture: ComponentFixture<DynamicFormInputMaskTestComponent>;
    let component: DynamicFormInputMaskTestComponent;
    let converterService: DynamicFormInputMaskConverterService;
    let defaultConverter: DynamicFormInputMaskConverter;

    beforeEach(() => {
      defaultConverter = { parse: value => value, format: value => value };
      converterService = MockService(DynamicFormInputMaskConverterService, { defaultConverter, getConverter: _ => defaultConverter });

      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormInputMaskConverterService,
            useValue: converterService,
          },
        ],
      });

      fixture = TestBed.createComponent(DynamicFormInputMaskTestComponent);
      component = fixture.componentInstance;
      component.inputMask = {
        control: new FormControl(null),
        maskOptions: {},
        maskOptionChanges$: EMPTY as Observable<Partial<DynamicFormInputMaskOptions>>,
        maskInputElement: _ => {},
      } as DynamicFormInputMaskControl;
    });

    it('value of input event is passed to onInput using default converter', () => {
      const defaultConverterParseSpy = spyOn(defaultConverter, 'parse').and.callThrough();

      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

      spyOn(component.inputMaskDirective, 'onInput').and.callThrough();

      inputElement.value = 'value';
      inputElement.dispatchEvent(new Event('input'));

      expect(component.inputMask.control.value).toBe('value');
      expect(component.inputMaskDirective.onInput).toHaveBeenCalledOnceWith('value');
      expect(defaultConverterParseSpy).toHaveBeenCalledOnceWith('value', component.inputMask.maskOptions);
    });

    it('value of input event is passed to onInput using non-default converter', () => {
      const converter = { parse: value => value, format: value => value } as DynamicFormInputMaskConverter;

      spyOn(converterService, 'getConverter').and.returnValue(converter);
      const converterParseSpy = spyOn(converter, 'parse').and.callThrough();
      const defaultConverterParseSpy = spyOn(defaultConverter, 'parse').and.callThrough();

      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

      spyOn(component.inputMaskDirective, 'onInput').and.callThrough();

      inputElement.value = 'value';
      inputElement.dispatchEvent(new Event('input'));

      expect(component.inputMask.control.value).toBe('value');
      expect(component.inputMaskDirective.onInput).toHaveBeenCalledOnceWith('value');
      expect(converterParseSpy).toHaveBeenCalledOnceWith('value', component.inputMask.maskOptions);
      expect(defaultConverterParseSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('with TestBed using DynamicFormInputMaskTestWithoutFormControlComponent', () => {
    let fixture: ComponentFixture<DynamicFormInputMaskTestWithoutFormControlComponent>;
    let component: DynamicFormInputMaskTestWithoutFormControlComponent;

    beforeEach(() => {
      const defaultConverter = { parse: value => value, format: value => value };

      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormInputMaskConverterService,
            useValue: MockService(DynamicFormInputMaskConverterService, { defaultConverter, getConverter: _ => defaultConverter }),
          },
        ],
      });

      fixture = TestBed.createComponent(DynamicFormInputMaskTestWithoutFormControlComponent);
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
