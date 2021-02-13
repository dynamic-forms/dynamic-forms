import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormElement, DynamicFormItems, DynamicFormLibraryService } from '@dynamic-forms/core';
import { MatDynamicFormTabsComponent } from './dynamic-form-tabs.component';
import { MatDynamicFormTabsModule } from './dynamic-form-tabs.module';

describe('MatDynamicFormTabsComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormTabsComponent>;
  let component: MatDynamicFormTabsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormTabsModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' })
        }
      ]
    });

    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const element = new DynamicFormItems(root, parent, { template: {}, children: [] });

    fixture = TestBed.createComponent(MatDynamicFormTabsComponent);
    component = fixture.componentInstance;
    component.element = element;

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
