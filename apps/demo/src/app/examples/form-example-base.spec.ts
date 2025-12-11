import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Data } from '@angular/router';
import { DynamicFormDefinition } from '@dynamic-forms/core';
import { MockService } from 'ng-mocks';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Example } from '../state/examples/examples.model';
import { FormExampleBase } from './form-example-base';

class TestFormExample extends FormExampleBase {
  constructor(
    protected override route: ActivatedRoute,
    protected override dialog: MatDialog,
  ) {
    super(route, dialog);
  }
}

describe('FormExampleBase', () => {
  let routeData: BehaviorSubject<Data>;
  let formExample: TestFormExample;

  beforeEach(() => {
    routeData = new BehaviorSubject<Data>(undefined);
    formExample = new TestFormExample(MockService(ActivatedRoute, { data: routeData.asObservable() }), MockService(MatDialog));
  });

  it('has data but no doc', async () => {
    const example = { id: 'id', label: 'Example' } as Example;
    const definition = {} as DynamicFormDefinition;

    routeData.next({ example, definition });

    const data = await firstValueFrom(formExample.data$);
    const doc = await firstValueFrom(formExample.doc$);

    expect(data).toEqual({ example, definition, model: {} });
    expect(doc).toBeUndefined();
  });

  it('has data and doc', async () => {
    const example = { id: 'id', label: 'Example', docId: 'docId' } as Example;
    const definition = {} as DynamicFormDefinition;
    const model = {};

    routeData.next({ example, definition, model });

    const data = await firstValueFrom(formExample.data$);
    const doc = await firstValueFrom(formExample.doc$);

    expect(data).toEqual({ example, definition, model });
    expect(doc).toEqual('./assets/examples/docId.md');
  });

  it('has data and doc with path', async () => {
    const example = { id: 'id', label: 'Example', path: 'path', docId: 'docId' } as Example;
    const definition = {} as DynamicFormDefinition;
    const model = {};

    routeData.next({ example, definition, model });

    const data = await firstValueFrom(formExample.data$);
    const doc = await firstValueFrom(formExample.doc$);

    expect(data).toEqual({ example, definition, model });
    expect(doc).toEqual('./assets/examples/path/docId.md');
  });
});
