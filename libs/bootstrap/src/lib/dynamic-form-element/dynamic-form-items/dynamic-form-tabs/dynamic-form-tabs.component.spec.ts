import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormBuilder, DynamicFormElement, DynamicFormElementType, DynamicFormItems,
  DynamicFormLibraryService } from '@dynamic-forms/core';
import { BsDynamicFormTabsComponent } from './dynamic-form-tabs.component';
import { BsDynamicFormTabsModule } from './dynamic-form-tabs.module';

describe('BsDynamicFormTabsComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormTabsComponent>;
  let component: BsDynamicFormTabsComponent;
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormTabsModule,
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
      ],
    });

    builder = {} as any;

    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const items = new DynamicFormItems(builder, root, parent, { template: {}, children: [] }, {} as DynamicFormElementType);

    fixture = TestBed.createComponent(BsDynamicFormTabsComponent);
    component = fixture.componentInstance;
    component.element = items;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('renders component template ', () => {
    const debugElement = fixture.debugElement.query(By.css('.dynamic-form-tabs'));

    expect(debugElement).toBeTruthy();
  });

  it('renders class name', () => {
    component.element.template.className = 'class-name';

    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('.dynamic-form-tabs'));
    const element = debugElement.nativeElement;

    expect(element).toBeTruthy();
  });
});
