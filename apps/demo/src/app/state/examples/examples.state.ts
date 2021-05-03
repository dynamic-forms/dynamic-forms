import { Injectable } from '@angular/core';
import { createSelector, Action, Selector, State, StateContext } from '@ngxs/store';
import { ExamplesInit } from './examples.actions';
import { Example, Examples, ExamplesMenu, ExampleMenuGroup, ExampleMenuItem, EXAMPLES } from './examples.model';

@State<Examples>({
  name: EXAMPLES,
  defaults: null
})
@Injectable()
export class ExamplesState {
  @Selector()
  static menu(state: Examples): ExamplesMenu {
    return state ? state.menu : undefined;
  }

  @Selector()
  static menuItems(state: Examples): ExampleMenuItem[] {
    return state && state.menu ? state.menu.items : undefined;
  }

  @Selector()
  static examples(state: Examples): { [key: string]: Example} {
    return state ? state.examples : undefined;
  }

  static example(id: string): (state: Examples) => Example  {
    return createSelector([ ExamplesState ], (state: Examples) => {
      return state && state.examples ? state.examples[id] : undefined;
    });
  }


  @Action(ExamplesInit)
  init(context: StateContext<Examples>, action: ExamplesInit): void {
    const menu = action.menu;
    const examples = this.getExamples(menu.items);
    context.patchState({ menu, examples });
  }

  private getExamples(items: ExampleMenuItem[], path?: string): { [key: string]: Example } {
    return items.reduce((result, item) => {
      const group = item as ExampleMenuGroup;
      if (group.items && group.items.length) {
        const groupId = group.groupId;
        const groupPath = groupId && path ? `${ path }/${groupId}` : groupId || path;
        return { ...result, ...this.getExamples(group.items, groupPath) };
      }
      const example = { ...item, path } as Example;
      if (example.id) {
        return { ...result, [example.id]: example  };
      }
      return result;
    }, {});
  }
}
