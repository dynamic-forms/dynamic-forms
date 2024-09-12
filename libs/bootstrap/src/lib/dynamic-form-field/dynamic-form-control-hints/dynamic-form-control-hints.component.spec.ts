import { Component, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  DynamicFormConfigService,
  DynamicFormInputBase,
  DynamicFormLibraryService,
  DynamicFormValidationService,
} from '@dynamic-forms/core';
import { BsDynamicFormControlHintsComponent } from './dynamic-form-control-hints.component';

@Component({
  standalone: true,
  selector: 'bs-dynamic-form-input-test',
  template: `<div>Dynamic Input</div>`,
})
class DynamicFormInputTestComponent extends DynamicFormInputBase {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

@NgModule({
  providers: [
    {
      provide: DynamicFormLibraryService,
      useValue: new DynamicFormLibraryService({ name: 'test' }),
    },
    DynamicFormConfigService,
    DynamicFormValidationService,
  ],
})
class DynamicFormWrapperTestModule {}

describe('BsDynamicFormControlHintsComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormControlHintsComponent>;
  let component: BsDynamicFormControlHintsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DynamicFormWrapperTestModule],
    });

    fixture = TestBed.createComponent(BsDynamicFormControlHintsComponent);
    component = fixture.componentInstance;
    component.field = { template: { hints: { hintStart: 'HintStart', hintEnd: 'HintEnd' } }, control: {} } as any;
    component.component = component.ref.createComponent(DynamicFormInputTestComponent).instance;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
    expect(component.hasHints).toBeTrue();
    expect(component.hints).toBe(component.field.template.hints);
  });

  it('renders component template', () => {
    const smallDebugElement = fixture.debugElement.query(By.css('small'));
    const hintStartDebugElement = smallDebugElement.query(By.css('span.hint-start'));
    const hintSpacerDebugElement = smallDebugElement.query(By.css('span.hint-spacer'));
    const hintEndDebugElement = smallDebugElement.query(By.css('span.hint-end'));

    const smallElement = smallDebugElement.nativeElement as HTMLElement;
    const hintStartElement = hintStartDebugElement.nativeElement as HTMLSpanElement;
    const hintSpacerElement = hintSpacerDebugElement.nativeElement as HTMLSpanElement;
    const hintEndElement = hintEndDebugElement.nativeElement as HTMLSpanElement;

    expect(smallElement).toBeTruthy();
    expect(smallElement.className).toBe('dynamic-form-field-hints form-text text-muted');
    expect(hintStartElement).toBeTruthy();
    expect(hintStartElement.innerText).toBe('HintStart');
    expect(hintSpacerElement).toBeTruthy();
    expect(hintSpacerElement.innerText).toBe('');
    expect(hintEndElement).toBeTruthy();
    expect(hintEndElement.innerText).toBe('HintEnd');

    component.field.template.hints.hintEnd = null;
    fixture.detectChanges();

    expect(component.hasHints).toBeTrue();
    expect(smallDebugElement.query(By.css('span.hint-end'))).toBeNull();

    component.field.template.hints.hintStart = null;
    component.field.template.hints.hintEnd = 'HintEnd';
    fixture.detectChanges();

    expect(component.hasHints).toBeTrue();
    expect(smallDebugElement.query(By.css('span.hint-start'))).toBeNull();

    component.field.template.hints.hintStart = null;
    component.field.template.hints.hintEnd = null;
    fixture.detectChanges();

    expect(component.hasHints).toBeFalse();
    expect(fixture.debugElement.query(By.css('small'))).toBeNull();
  });
});
