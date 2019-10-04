import { Component, ComponentFactoryResolver, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicFormConfig, DynamicFormConfigService, DynamicFormInputComponent,
  DynamicFormValidationService } from '@dynamic-forms/core';
import { BsDynamicFormControlErrorsComponent } from './dynamic-form-control-errors.component';
import { BsDynamicFormControlErrorsModule } from './dynamic-form-control-errors.module';

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
    BsDynamicFormControlErrorsModule
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
class BsDynamicFormControlLabelTestModule {}

describe('BsDynamicFormControlErrorsComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormControlErrorsComponent>;
  let component: BsDynamicFormControlErrorsComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormControlLabelTestModule
      ]
    });

    fixture = TestBed.createComponent(BsDynamicFormControlErrorsComponent);
    component = fixture.componentInstance;
    component.field = <any>{ control: { errors: { required: { message: 'This field is required.' } }, touched: true } };

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
    const errorsDebugElement = fixture.debugElement.query(By.css('div.invalid-feedback'));
    const errorsElement = <HTMLLabelElement>errorsDebugElement.nativeElement;

    expect(errorsElement).toBeDefined();
    expect(errorsElement.innerText).toBe('This field is required.');
  });
});
