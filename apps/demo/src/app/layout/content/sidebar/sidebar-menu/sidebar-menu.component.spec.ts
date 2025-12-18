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
      teardown: { destroyAfterEach: false },
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
    expect(component.hasChildren(2, { children: [] } as any)).toBeFalsy();
    expect(component.hasChildren(3, { children: [{} as any] } as any)).toBeTruthy();
  });

  it('has tree data', async () => {
    const dataSource = await firstValueFrom(component.dataSource$);

    expect(dataSource.length).toBe(5);

    expect(dataSource[0].label).toBe('Home');
    expect(dataSource[0].route).toBe('/home');
    expect(dataSource[0].children).toBeUndefined();

    expect(dataSource[1].label).toBe('Docs');
    expect(dataSource[1].route).toBeUndefined();
    expect(dataSource[1].children.length).toBe(6);
    expect(dataSource[1].children[0].label).toBe('Core');
    expect(dataSource[1].children[0].children.length).toBe(2);
    expect(dataSource[1].children[0].children[0].label).toBe('Code Doc');
    expect(dataSource[1].children[0].children[1].label).toBe('Code Coverage');
    expect(dataSource[1].children[1].label).toBe('Bootstrap');
    expect(dataSource[1].children[1].children.length).toBe(2);
    expect(dataSource[1].children[1].children[0].label).toBe('Code Doc');
    expect(dataSource[1].children[1].children[1].label).toBe('Code Coverage');
    expect(dataSource[1].children[2].label).toBe('Material');
    expect(dataSource[1].children[2].children.length).toBe(2);
    expect(dataSource[1].children[2].children[0].label).toBe('Code Doc');
    expect(dataSource[1].children[2].children[1].label).toBe('Code Coverage');
    expect(dataSource[1].children[3].label).toBe('Markdown');
    expect(dataSource[1].children[3].children.length).toBe(2);
    expect(dataSource[1].children[3].children[0].label).toBe('Code Doc');
    expect(dataSource[1].children[3].children[1].label).toBe('Code Coverage');
    expect(dataSource[1].children[4].label).toBe('Demo');
    expect(dataSource[1].children[4].children.length).toBe(1);
    expect(dataSource[1].children[4].children[0].label).toBe('Code Coverage');
    expect(dataSource[1].children[5].label).toBe('Changelog');
    expect(dataSource[1].children[5].children).toBeUndefined();

    expect(dataSource[2].label).toBe('Examples');
    expect(dataSource[2].route).toBeUndefined();
    expect(dataSource[2].children.length).toBe(2);
    expect(dataSource[2].children[0].label).toBe('Bootstrap');
    expect(dataSource[2].children[0].children).toEqual([]);
    expect(dataSource[2].children[1].label).toBe('Material');
    expect(dataSource[2].children[1].children).toEqual([]);

    expect(dataSource[3].label).toBe('Editor');
    expect(dataSource[3].route).toBeUndefined();
    expect(dataSource[3].children.length).toBe(2);
    expect(dataSource[3].children[0].label).toBe('Bootstrap');
    expect(dataSource[3].children[0].route).toBe('/editor/bootstrap');
    expect(dataSource[3].children[1].label).toBe('Material');
    expect(dataSource[3].children[1].route).toBe('/editor/material');

    expect(dataSource[4].label).toBe('License');
    expect(dataSource[4].route).toBe('/license');
    expect(dataSource[4].children).toBeUndefined();

    fixture.detectChanges();
  });

  it('has tree data for config and examples being initialized', async () => {
    const repository = {
      url: 'https://github.com/dynamic-forms/dynamic-forms',
      branch: '21.0.x',
      branchPath: 'tree/{{branch}}',
      libraryPath: 'libs/{{library}}',
      appPath: 'apps/{{app}}',
    };
    const items = [
      { id: 'id1', label: 'Example 1' },
      { label: 'Group', items: [{ id: 'id2', label: 'Example 2', modelId: 'modelId2' }] },
    ];

    store.dispatch(new ConfigInit({ repository } as Config));
    store.dispatch(new ExamplesInit({ items }));

    const dataSource = await firstValueFrom(component.dataSource$);

    expect(dataSource.length).toBe(5);

    expect(dataSource[0].label).toBe('Home');
    expect(dataSource[0].route).toBe('/home');
    expect(dataSource[0].children).toBeUndefined();

    expect(dataSource[1].label).toBe('Docs');
    expect(dataSource[1].route).toBeUndefined();
    expect(dataSource[1].children.length).toBe(6);
    expect(dataSource[1].children[0].label).toBe('Core');
    expect(dataSource[1].children[0].children.length).toBe(3);
    expect(dataSource[1].children[0].children[0].label).toBe('Code');
    expect(dataSource[1].children[0].children[1].label).toBe('Code Doc');
    expect(dataSource[1].children[0].children[2].label).toBe('Code Coverage');
    expect(dataSource[1].children[1].label).toBe('Bootstrap');
    expect(dataSource[1].children[1].children.length).toBe(3);
    expect(dataSource[1].children[1].children[0].label).toBe('Code');
    expect(dataSource[1].children[1].children[1].label).toBe('Code Doc');
    expect(dataSource[1].children[1].children[2].label).toBe('Code Coverage');
    expect(dataSource[1].children[2].label).toBe('Material');
    expect(dataSource[1].children[2].children.length).toBe(3);
    expect(dataSource[1].children[2].children[0].label).toBe('Code');
    expect(dataSource[1].children[2].children[1].label).toBe('Code Doc');
    expect(dataSource[1].children[2].children[2].label).toBe('Code Coverage');
    expect(dataSource[1].children[3].label).toBe('Markdown');
    expect(dataSource[1].children[3].children.length).toBe(3);
    expect(dataSource[1].children[3].children[0].label).toBe('Code');
    expect(dataSource[1].children[3].children[1].label).toBe('Code Doc');
    expect(dataSource[1].children[3].children[2].label).toBe('Code Coverage');
    expect(dataSource[1].children[4].label).toBe('Demo');
    expect(dataSource[1].children[4].children.length).toBe(2);
    expect(dataSource[1].children[4].children[0].label).toBe('Code');
    expect(dataSource[1].children[4].children[1].label).toBe('Code Coverage');
    expect(dataSource[1].children[5].label).toBe('Changelog');
    expect(dataSource[1].children[5].children).toBeUndefined();

    expect(dataSource[2].label).toBe('Examples');
    expect(dataSource[2].route).toBeUndefined();
    expect(dataSource[2].children.length).toBe(2);
    expect(dataSource[2].children[0].label).toBe('Bootstrap');
    expect(dataSource[2].children[0].children.length).toBe(2);
    expect(dataSource[2].children[1].label).toBe('Material');
    expect(dataSource[2].children[1].children.length).toBe(2);

    expect(dataSource[3].label).toBe('Editor');
    expect(dataSource[3].route).toBeUndefined();
    expect(dataSource[3].children.length).toBe(2);
    expect(dataSource[3].children[0].label).toBe('Bootstrap');
    expect(dataSource[3].children[0].route).toBe('/editor/bootstrap');
    expect(dataSource[3].children[1].label).toBe('Material');
    expect(dataSource[3].children[1].route).toBe('/editor/material');

    expect(dataSource[4].label).toBe('License');
    expect(dataSource[4].route).toBe('/license');
    expect(dataSource[4].children).toBeUndefined();

    fixture.detectChanges();
  });
});
