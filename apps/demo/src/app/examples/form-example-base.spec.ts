import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Data } from '@angular/router';
import { DynamicFormDefinition } from '@dynamic-forms/core';
import { MockProvider } from 'ng-mocks';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Example } from '../state/examples/examples.model';
import { FormExampleBase } from './form-example-base';

@Component({
  selector: 'app-test-form-example',
  template: '',
})
class TestFormExampleComponent extends FormExampleBase {}

describe('FormExampleBase', () => {
  let fixture: ComponentFixture<TestFormExampleComponent>;
  let component: TestFormExampleComponent;
  let routeData: BehaviorSubject<Data>;

  beforeEach(() => {
    routeData = new BehaviorSubject<Data>(undefined);

    TestBed.configureTestingModule({
      providers: [MockProvider(ActivatedRoute, { data: routeData.asObservable() }), MockProvider(MatDialog)],
    });

    fixture = TestBed.createComponent(TestFormExampleComponent);
    component = fixture.componentInstance;
  });

  it('has data but no doc', async () => {
    const example = { id: 'id', label: 'Example' } as Example;
    const definition = {} as DynamicFormDefinition;

    routeData.next({ example, definition });

    const data = await firstValueFrom(component.data$);
    const doc = await firstValueFrom(component.doc$);

    expect(data).toEqual({ example, definition, model: {} });
    expect(doc).toBeUndefined();
  });

  it('has data and doc', async () => {
    const example = { id: 'id', label: 'Example', docId: 'docId' } as Example;
    const definition = {} as DynamicFormDefinition;
    const model = {};

    routeData.next({ example, definition, model });

    const data = await firstValueFrom(component.data$);
    const doc = await firstValueFrom(component.doc$);

    expect(data).toEqual({ example, definition, model });
    expect(doc).toEqual('./assets/examples/docId.md');
  });

  it('has data and doc with path', async () => {
    const example = { id: 'id', label: 'Example', path: 'path', docId: 'docId' } as Example;
    const definition = {} as DynamicFormDefinition;
    const model = {};

    routeData.next({ example, definition, model });

    const data = await firstValueFrom(component.data$);
    const doc = await firstValueFrom(component.doc$);

    expect(data).toEqual({ example, definition, model });
    expect(doc).toEqual('./assets/examples/path/docId.md');
  });
});
