import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  DynamicForm,
  DynamicFormBuilder,
  DynamicFormElement,
  DynamicFormElementType,
  DynamicFormItems,
  DynamicFormLibraryService,
} from '@dynamic-forms/core';
import { MockService } from 'ng-mocks';
import { MatDynamicFormTabsComponent } from './dynamic-form-tabs.component';

describe('MatDynamicFormTabsComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormTabsComponent>;
  let component: MatDynamicFormTabsComponent;
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
      ],
    });

    builder = MockService(DynamicFormBuilder);

    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const items = new DynamicFormItems(builder, root, parent, { template: {}, children: [] }, {} as DynamicFormElementType);

    fixture = TestBed.createComponent(MatDynamicFormTabsComponent);
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

    const debugElement = fixture.debugElement.query(By.css('.dynamic-form-tabs.class-name'));
    const element = debugElement.nativeElement;

    expect(element).toBeTruthy();
  });
});
