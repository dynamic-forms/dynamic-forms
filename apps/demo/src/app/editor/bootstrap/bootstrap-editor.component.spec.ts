import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Data } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { MockProvider } from 'ng-mocks';
import { Subject } from 'rxjs';
import { BootstrapEditorComponent } from './bootstrap-editor.component';

describe('BootstrapEditorComponent', () => {
  let fixture: ComponentFixture<BootstrapEditorComponent>;
  let component: BootstrapEditorComponent;
  let routeData: Subject<Data>;

  beforeEach(() => {
    routeData = new Subject<Data>();

    TestBed.configureTestingModule({
      providers: [provideStore([]), MockProvider(ActivatedRoute, { data: routeData.asObservable() }, 'useValue')],
      teardown: { destroyAfterEach: false },
    });

    fixture = TestBed.createComponent(BootstrapEditorComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('has data from route', () => {
    const definition = { children: [] };
    const model = {};
    const data = { definition, model };

    routeData.next(data);

    expect(component.data()).toEqual(data);
  });

  it('has data from route without model', () => {
    const definition = { children: [] };
    const data = { definition };

    routeData.next(data);

    expect(component.data()).toEqual({ definition, model: {} });
  });
});
