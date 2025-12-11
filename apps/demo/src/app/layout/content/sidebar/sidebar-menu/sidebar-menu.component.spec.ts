import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Store, provideStore } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { ConfigInit } from '../../../../state/config/config.actions';
import { Config } from '../../../../state/config/config.model';
import { ConfigState } from '../../../../state/config/config.state';
import { ExamplesInit } from '../../../../state/examples/examples.actions';
import { ExamplesState } from '../../../../state/examples/examples.state';
import { SidebarMenuComponent } from './sidebar-menu.component';

describe('SidebarMenuComponent', () => {
  let fixture: ComponentFixture<SidebarMenuComponent>;
  let component: SidebarMenuComponent;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideStore([ConfigState, ExamplesState])],
    });

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(SidebarMenuComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('hasChildren returns correct value', () => {
    expect(component.hasChildren(1, {} as any)).toBeFalsy();
    expect(component.hasChildren(2, { children: [] } as any)).toBeTruthy();
  });

  it('has tree data', async () => {
    const treeDataSource = await firstValueFrom(component.treeDataSource$);

    expect(treeDataSource.data.length).toBe(5);

    expect(treeDataSource.data[0].label).toBe('Home');
    expect(treeDataSource.data[0].route).toBe('/home');
    expect(treeDataSource.data[0].children).toBeUndefined();

    expect(treeDataSource.data[1].label).toBe('Docs');
    expect(treeDataSource.data[1].route).toBeUndefined();
    expect(treeDataSource.data[1].children.length).toBe(5);
    expect(treeDataSource.data[1].children[0].label).toBe('Core');
    expect(treeDataSource.data[1].children[0].children.length).toBe(2);
    expect(treeDataSource.data[1].children[0].children[0].label).toBe('Code Doc');
    expect(treeDataSource.data[1].children[0].children[1].label).toBe('Code Coverage');
    expect(treeDataSource.data[1].children[1].label).toBe('Bootstrap');
    expect(treeDataSource.data[1].children[1].children.length).toBe(2);
    expect(treeDataSource.data[1].children[1].children[0].label).toBe('Code Doc');
    expect(treeDataSource.data[1].children[1].children[1].label).toBe('Code Coverage');
    expect(treeDataSource.data[1].children[2].label).toBe('Material');
    expect(treeDataSource.data[1].children[2].children.length).toBe(2);
    expect(treeDataSource.data[1].children[2].children[0].label).toBe('Code Doc');
    expect(treeDataSource.data[1].children[2].children[1].label).toBe('Code Coverage');
    expect(treeDataSource.data[1].children[3].label).toBe('Markdown');
    expect(treeDataSource.data[1].children[3].children.length).toBe(2);
    expect(treeDataSource.data[1].children[3].children[0].label).toBe('Code Doc');
    expect(treeDataSource.data[1].children[3].children[1].label).toBe('Code Coverage');
    expect(treeDataSource.data[1].children[4].label).toBe('Changelog');
    expect(treeDataSource.data[1].children[4].children).toBeUndefined();

    expect(treeDataSource.data[2].label).toBe('Examples');
    expect(treeDataSource.data[2].route).toBeUndefined();
    expect(treeDataSource.data[2].children.length).toBe(2);
    expect(treeDataSource.data[2].children[0].label).toBe('Bootstrap');
    expect(treeDataSource.data[2].children[0].children).toEqual([]);
    expect(treeDataSource.data[2].children[1].label).toBe('Material');
    expect(treeDataSource.data[2].children[1].children).toEqual([]);

    expect(treeDataSource.data[3].label).toBe('Editor');
    expect(treeDataSource.data[3].route).toBeUndefined();
    expect(treeDataSource.data[3].children.length).toBe(2);
    expect(treeDataSource.data[3].children[0].label).toBe('Bootstrap');
    expect(treeDataSource.data[3].children[0].route).toBe('/editor/bootstrap');
    expect(treeDataSource.data[3].children[1].label).toBe('Material');
    expect(treeDataSource.data[3].children[1].route).toBe('/editor/material');

    expect(treeDataSource.data[4].label).toBe('License');
    expect(treeDataSource.data[4].route).toBe('/license');
    expect(treeDataSource.data[4].children).toBeUndefined();

    fixture.detectChanges();
  });

  it('has tree data for config and examples being initialized', async () => {
    const repository = {
      url: 'https://github.com/dynamic-forms/dynamic-forms',
      branch: '21.0.x',
      branchPath: 'tree/{{branch}}',
      libraryPath: 'libs/{{library}}',
    };
    const items = [
      { id: 'id1', label: 'Example 1' },
      { label: 'Group', items: [{ id: 'id2', label: 'Example 2', modelId: 'modelId2' }] },
    ];

    store.dispatch(new ConfigInit({ repository } as Config));
    store.dispatch(new ExamplesInit({ items }));

    const treeDataSource = await firstValueFrom(component.treeDataSource$);

    expect(treeDataSource.data.length).toBe(5);

    expect(treeDataSource.data[0].label).toBe('Home');
    expect(treeDataSource.data[0].route).toBe('/home');
    expect(treeDataSource.data[0].children).toBeUndefined();

    expect(treeDataSource.data[1].label).toBe('Docs');
    expect(treeDataSource.data[1].route).toBeUndefined();
    expect(treeDataSource.data[1].children.length).toBe(5);
    expect(treeDataSource.data[1].children[0].label).toBe('Core');
    expect(treeDataSource.data[1].children[0].children.length).toBe(3);
    expect(treeDataSource.data[1].children[0].children[0].label).toBe('Code');
    expect(treeDataSource.data[1].children[0].children[1].label).toBe('Code Doc');
    expect(treeDataSource.data[1].children[0].children[2].label).toBe('Code Coverage');
    expect(treeDataSource.data[1].children[1].label).toBe('Bootstrap');
    expect(treeDataSource.data[1].children[1].children.length).toBe(3);
    expect(treeDataSource.data[1].children[1].children[0].label).toBe('Code');
    expect(treeDataSource.data[1].children[1].children[1].label).toBe('Code Doc');
    expect(treeDataSource.data[1].children[1].children[2].label).toBe('Code Coverage');
    expect(treeDataSource.data[1].children[2].label).toBe('Material');
    expect(treeDataSource.data[1].children[2].children.length).toBe(3);
    expect(treeDataSource.data[1].children[2].children[0].label).toBe('Code');
    expect(treeDataSource.data[1].children[2].children[1].label).toBe('Code Doc');
    expect(treeDataSource.data[1].children[2].children[2].label).toBe('Code Coverage');
    expect(treeDataSource.data[1].children[3].label).toBe('Markdown');
    expect(treeDataSource.data[1].children[3].children.length).toBe(3);
    expect(treeDataSource.data[1].children[3].children[0].label).toBe('Code');
    expect(treeDataSource.data[1].children[3].children[1].label).toBe('Code Doc');
    expect(treeDataSource.data[1].children[3].children[2].label).toBe('Code Coverage');
    expect(treeDataSource.data[1].children[4].label).toBe('Changelog');
    expect(treeDataSource.data[1].children[4].children).toBeUndefined();

    expect(treeDataSource.data[2].label).toBe('Examples');
    expect(treeDataSource.data[2].route).toBeUndefined();
    expect(treeDataSource.data[2].children.length).toBe(2);
    expect(treeDataSource.data[2].children[0].label).toBe('Bootstrap');
    expect(treeDataSource.data[2].children[0].children.length).toBe(2);
    expect(treeDataSource.data[2].children[1].label).toBe('Material');
    expect(treeDataSource.data[2].children[1].children.length).toBe(2);

    expect(treeDataSource.data[3].label).toBe('Editor');
    expect(treeDataSource.data[3].route).toBeUndefined();
    expect(treeDataSource.data[3].children.length).toBe(2);
    expect(treeDataSource.data[3].children[0].label).toBe('Bootstrap');
    expect(treeDataSource.data[3].children[0].route).toBe('/editor/bootstrap');
    expect(treeDataSource.data[3].children[1].label).toBe('Material');
    expect(treeDataSource.data[3].children[1].route).toBe('/editor/material');

    expect(treeDataSource.data[4].label).toBe('License');
    expect(treeDataSource.data[4].route).toBe('/license');
    expect(treeDataSource.data[4].children).toBeUndefined();

    fixture.detectChanges();
  });
});
