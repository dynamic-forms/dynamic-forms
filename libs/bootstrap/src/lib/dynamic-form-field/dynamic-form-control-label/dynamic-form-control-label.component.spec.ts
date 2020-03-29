import { Component, ComponentFactoryResolver, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicFormConfigService, DynamicFormInputBase, DynamicFormLibraryService,
  DynamicFormValidationService } from '@dynamic-forms/core';
import { BsDynamicFormControlLabelComponent } from './dynamic-form-control-label.component';
import { BsDynamicFormControlLabelModule } from './dynamic-form-control-label.module';

@Component({
  selector: 'bs-dynamic-form-input-test',
  template: `<div>Dynamic Input</div>`
})
class DynamicFormInputTestComponent extends DynamicFormInputBase {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}

@NgModule({
  imports: [
    BsDynamicFormControlLabelModule
  ],
  declarations: [
    DynamicFormInputTestComponent
  ],
  providers: [
    {
      provide: DynamicFormLibraryService,
      useValue: new DynamicFormLibraryService({ name: 'test' })
    },
    DynamicFormConfigService,
    DynamicFormValidationService
  ]
})
class BsDynamicFormControlLabelTestModule {}

describe('BsDynamicFormControlLabelComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormControlLabelComponent>;
  let component: BsDynamicFormControlLabelComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormControlLabelTestModule
      ]
    });

    fixture = TestBed.createComponent(BsDynamicFormControlLabelComponent);
    component = fixture.componentInstance;
    component.field = <any>{ inputId: 'inputId', template: { label: 'label' } };

    const resolver = TestBed.inject(ComponentFactoryResolver);
    const factory = resolver.resolveComponentFactory(DynamicFormInputTestComponent);
    component.component = component.ref.createComponent<DynamicFormInputTestComponent>(factory).instance;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
  });

  it('creates component template', () => {
    const labelDebugElement = fixture.debugElement.query(By.css('label'));
    const labelElement = <HTMLLabelElement>labelDebugElement.nativeElement;

    expect(labelElement).toBeDefined();
    expect(labelElement.htmlFor).toBe('inputId');
    expect(labelElement.innerText).toBe('label');
  });
});
