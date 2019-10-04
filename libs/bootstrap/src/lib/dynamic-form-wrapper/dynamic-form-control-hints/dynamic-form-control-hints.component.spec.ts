import { Component, ComponentFactoryResolver, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicFormConfig, DynamicFormConfigService, DynamicFormInputComponent,
  DynamicFormValidationService } from '@dynamic-forms/core';
import { BsDynamicFormControlHintsComponent } from './dynamic-form-control-hints.component';
import { BsDynamicFormControlHintsModule } from './dynamic-form-control-hints.module';

@Component({
  selector: 'bs-dynamic-form-input-test',
  template: `<div>Dynamic Input</div>`
})
class DynamicFormInputTestComponent extends DynamicFormInputComponent {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

@NgModule({
  imports: [
    BsDynamicFormControlHintsModule
  ],
  declarations: [
    DynamicFormInputTestComponent
  ],
  entryComponents: [
    DynamicFormInputTestComponent
  ],
  providers: [
    {
      provide: DynamicFormConfigService,
      useValue: new DynamicFormConfigService(<DynamicFormConfig>{})
    },
    DynamicFormValidationService
  ]
})
class DynamicFormWrapperTestModule {}

describe('BsDynamicFormControlHintsComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormControlHintsComponent>;
  let component: BsDynamicFormControlHintsComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormWrapperTestModule
      ]
    });

    fixture = TestBed.createComponent(BsDynamicFormControlHintsComponent);
    component = fixture.componentInstance;
    component.field = <any>{ template: { hints: { hintStart: 'HintStart', hintEnd: 'HintEnd' } }, control: {} };

    // tslint:disable-next-line: deprecation
    const resolver = TestBed.get(ComponentFactoryResolver);
    const factory = resolver.resolveComponentFactory(DynamicFormInputTestComponent);
    component.fieldComponent = component.ref.createComponent<DynamicFormInputTestComponent>(factory).instance;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
  });

  it('creates component template', () => {
    const smallDebugElement = fixture.debugElement.query(By.css('small'));
    const hintStartDebugElement = smallDebugElement.query(By.css('span.hint-start'));
    const hintSpacerDebugElement = smallDebugElement.query(By.css('span.hint-spacer'));
    const hintEndDebugElement = smallDebugElement.query(By.css('span.hint-end'));

    const smallElement = <HTMLElement>smallDebugElement.nativeElement;
    const hintStartElement = <HTMLSpanElement>hintStartDebugElement.nativeElement;
    const hintSpacerElement = <HTMLSpanElement>hintSpacerDebugElement.nativeElement;
    const hintEndElement = <HTMLSpanElement>hintEndDebugElement.nativeElement;

    expect(smallElement).toBeDefined();
    expect(smallElement.className).toBe('dynamic-form-field-hints form-text text-muted');
    expect(hintStartElement).toBeDefined();
    expect(hintStartElement.innerText).toBe('HintStart');
    expect(hintSpacerElement).toBeDefined();
    expect(hintSpacerElement.innerText).toBe('');
    expect(hintEndElement).toBeDefined();
    expect(hintEndElement.innerText).toBe('HintEnd');

    component.field.template.hints.hintEnd = null;
    fixture.detectChanges();

    expect(smallDebugElement.query(By.css('span.hint-end'))).toBeNull();

    component.field.template.hints.hintStart = null;
    component.field.template.hints.hintEnd = 'HintEnd';
    fixture.detectChanges();

    expect(smallDebugElement.query(By.css('span.hint-start'))).toBeNull();

    component.field.template.hints.hintStart = null;
    component.field.template.hints.hintEnd = null;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('small'))).toBeNull();
  });
});
