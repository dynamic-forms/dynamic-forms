import { TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngxs/store';
import { ExamplesInit } from './examples.actions';
import { EXAMPLES } from './examples.model';
import { ExamplesState } from './examples.state';

describe('ExamplesState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([ExamplesState])],
      teardown: { destroyAfterEach: false },
    });

    store = TestBed.inject(Store);
  });

  it('returns default state', () => {
    expect(store.selectSnapshot(EXAMPLES)).toBeNull();
    expect(store.selectSnapshot(ExamplesState.menu)).toBeUndefined();
    expect(store.selectSnapshot(ExamplesState.menuItems)).toBeUndefined();
    expect(store.selectSnapshot(ExamplesState.examples)).toBeUndefined();
    expect(store.selectSnapshot(ExamplesState.example('id'))).toBeUndefined();
  });

  it('inits examples for menu without items', () => {
    const items = [];
    const menu = { items };

    store.dispatch(new ExamplesInit(menu));

    expect(store.selectSnapshot(ExamplesState.menu)).toEqual(menu);
    expect(store.selectSnapshot(ExamplesState.menuItems)).toEqual(items);
    expect(store.selectSnapshot(ExamplesState.examples)).toEqual({});
    expect(store.selectSnapshot(ExamplesState.example('id'))).toBeUndefined();
  });

  it('inits examples for menu without example items', () => {
    const items = [{ label: 'Label' }];
    const menu = { items };

    store.dispatch(new ExamplesInit(menu));

    expect(store.selectSnapshot(ExamplesState.menu)).toEqual(menu);
    expect(store.selectSnapshot(ExamplesState.menuItems)).toEqual(items);
    expect(store.selectSnapshot(ExamplesState.examples)).toEqual({});
    expect(store.selectSnapshot(ExamplesState.example('id'))).toBeUndefined();
  });

  it('inits examples for menu with menu item', () => {
    const items = [{ id: 'id', label: 'Label' }];
    const menu = { items };

    store.dispatch(new ExamplesInit(menu));

    expect(store.selectSnapshot(ExamplesState.menu)).toEqual(menu);
    expect(store.selectSnapshot(ExamplesState.menuItems)).toEqual(items);
    expect(store.selectSnapshot(ExamplesState.examples)).toEqual({ id: { id: 'id', label: 'Label', path: undefined } });
    expect(store.selectSnapshot(ExamplesState.example('id'))).toEqual({ id: 'id', label: 'Label', path: undefined });
  });

  it('inits examples for menu with menu items', () => {
    const items = [
      { id: 'id1', label: 'Label 1' },
      { id: 'id2', label: 'Label 2' },
    ];
    const menu = { items };

    store.dispatch(new ExamplesInit(menu));

    expect(store.selectSnapshot(ExamplesState.menu)).toEqual(menu);
    expect(store.selectSnapshot(ExamplesState.menuItems)).toEqual(items);
    expect(store.selectSnapshot(ExamplesState.examples)).toEqual({
      id1: { id: 'id1', label: 'Label 1', path: undefined },
      id2: { id: 'id2', label: 'Label 2', path: undefined },
    });
    expect(store.selectSnapshot(ExamplesState.example('id'))).toBeUndefined();
    expect(store.selectSnapshot(ExamplesState.example('id1'))).toEqual({ id: 'id1', label: 'Label 1', path: undefined });
    expect(store.selectSnapshot(ExamplesState.example('id2'))).toEqual({ id: 'id2', label: 'Label 2', path: undefined });
  });

  it('inits examples for menu with menu item group', () => {
    const items = [{ groupId: 'groupId', label: 'Group Label', items: [{ id: 'id', label: 'Label' }] }];
    const menu = { items };

    store.dispatch(new ExamplesInit(menu));

    expect(store.selectSnapshot(ExamplesState.menu)).toEqual(menu);
    expect(store.selectSnapshot(ExamplesState.menuItems)).toEqual(items);
    expect(store.selectSnapshot(ExamplesState.examples)).toEqual({ id: { id: 'id', label: 'Label', path: 'groupId' } });
    expect(store.selectSnapshot(ExamplesState.example('id'))).toEqual({ id: 'id', label: 'Label', path: 'groupId' });
  });

  it('inits examples for menu with menu item group without group id', () => {
    const items = [{ label: 'Group Label', items: [{ id: 'id', label: 'Label' }] }];
    const menu = { items };

    store.dispatch(new ExamplesInit(menu));

    expect(store.selectSnapshot(ExamplesState.menu)).toEqual(menu);
    expect(store.selectSnapshot(ExamplesState.menuItems)).toEqual(items);
    expect(store.selectSnapshot(ExamplesState.examples)).toEqual({ id: { id: 'id', label: 'Label', path: undefined } });
    expect(store.selectSnapshot(ExamplesState.example('id'))).toEqual({ id: 'id', label: 'Label', path: undefined });
  });

  it('inits examples for menu with menu item group of menu item group', () => {
    const items = [
      {
        groupId: 'groupId1',
        label: 'Group Label 1',
        items: [{ groupId: 'groupId2', label: 'Group Label 2', items: [{ id: 'id', label: 'Label' }] }],
      },
    ];
    const menu = { items };

    store.dispatch(new ExamplesInit(menu));

    expect(store.selectSnapshot(ExamplesState.menu)).toEqual(menu);
    expect(store.selectSnapshot(ExamplesState.menuItems)).toEqual(items);
    expect(store.selectSnapshot(ExamplesState.examples)).toEqual({ id: { id: 'id', label: 'Label', path: 'groupId1/groupId2' } });
    expect(store.selectSnapshot(ExamplesState.example('id'))).toEqual({ id: 'id', label: 'Label', path: 'groupId1/groupId2' });
  });

  it('inits examples for menu with menu item group of menu item group without group id', () => {
    const items = [
      {
        label: 'Group Label 1',
        items: [{ groupId: 'groupId2', label: 'Group Label 2', items: [{ id: 'id', label: 'Label' }] }],
      },
    ];
    const menu = { items };

    store.dispatch(new ExamplesInit(menu));

    expect(store.selectSnapshot(ExamplesState.menu)).toEqual(menu);
    expect(store.selectSnapshot(ExamplesState.menuItems)).toEqual(items);
    expect(store.selectSnapshot(ExamplesState.examples)).toEqual({ id: { id: 'id', label: 'Label', path: 'groupId2' } });
    expect(store.selectSnapshot(ExamplesState.example('id'))).toEqual({ id: 'id', label: 'Label', path: 'groupId2' });
  });

  it('inits examples for menu with menu item group without group id of menu item group', () => {
    const items = [
      {
        groupId: 'groupId1',
        label: 'Group Label 1',
        items: [{ label: 'Group Label 2', items: [{ id: 'id', label: 'Label' }] }],
      },
    ];
    const menu = { items };

    store.dispatch(new ExamplesInit(menu));

    expect(store.selectSnapshot(ExamplesState.menu)).toEqual(menu);
    expect(store.selectSnapshot(ExamplesState.menuItems)).toEqual(items);
    expect(store.selectSnapshot(ExamplesState.examples)).toEqual({ id: { id: 'id', label: 'Label', path: 'groupId1' } });
    expect(store.selectSnapshot(ExamplesState.example('id'))).toEqual({ id: 'id', label: 'Label', path: 'groupId1' });
  });
});
