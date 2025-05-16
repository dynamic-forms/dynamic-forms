import { NestedTreeControl } from '@angular/cdk/tree';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repository } from '../../../../state/config/config.model';
import { ConfigState } from '../../../../state/config/config.state';
import { ExampleMenu, ExampleMenuGroup, ExampleMenuItem } from '../../../../state/examples/examples.model';
import { ExamplesState } from '../../../../state/examples/examples.state';
import { CodeUrlPipe } from '../../../header/pipes/code-url.pipe';
import { SidebarMenuItem } from './sidebar-menu.model';

@Component({
  selector: 'app-sidebar-menu',
  imports: [AsyncPipe, RouterLink, RouterLinkActive, MatButtonModule, MatIconModule, MatTreeModule],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss',
})
export class SidebarMenuComponent {
  readonly treeControl: NestedTreeControl<SidebarMenuItem>;
  readonly treeDataSource$: Observable<MatTreeNestedDataSource<SidebarMenuItem>>;

  constructor(
    private store: Store,
    private codeUrlPipe: CodeUrlPipe,
  ) {
    this.treeControl = new NestedTreeControl<SidebarMenuItem>((menuItem: any) => menuItem.children);
    this.treeDataSource$ = combineLatest([this.store.select(ConfigState.repository), this.store.select(ExamplesState.menuItems)]).pipe(
      map(([repository, examples]) => this.getTreeDataSource(repository, examples)),
    );
  }

  hasChildren = (_: number, menuItem: any) => menuItem.children;

  private getTreeDataSource(repository: Repository, examples: ExampleMenuItem[]): MatTreeNestedDataSource<SidebarMenuItem> {
    const docsChildren = ['core', 'bootstrap', 'material', 'markdown'].map(library => this.getMenuItemForDocs(library, repository));
    const examplesChildren = ['bootstrap', 'material'].map(library => this.getMenuItemForExamples(library, examples));
    const editorChildren = ['bootstrap', 'material'].map(library => this.getMenuItemForEditors(library));
    const treeDataSource = new MatTreeNestedDataSource<SidebarMenuItem>();
    treeDataSource.data = [
      { label: 'Home', route: '/home' },
      { label: 'Docs', children: [...docsChildren, { label: 'Changelog', route: '/docs/changelog' }] },
      { label: 'Examples', children: examplesChildren },
      { label: 'Editor', children: editorChildren },
      { label: 'License', route: '/license' },
    ];
    return treeDataSource;
  }

  private getLibraryName(library: string): string {
    return library.slice(0, 1).toUpperCase() + library.slice(1);
  }

  private getMenuItemForDocs(library: string, repository: Repository): SidebarMenuItem {
    const children = [
      { label: 'Code Doc', route: `/docs/${library}/doc` },
      { label: 'Code Coverage', route: `/docs/${library}/coverage` },
    ] as SidebarMenuItem[];
    if (repository) {
      const href = this.codeUrlPipe.transform(repository, library);
      children.splice(0, 0, { label: 'Code', href });
    }
    return { label: this.getLibraryName(library), children };
  }

  private getMenuItemForExamples(library: string, examples: ExampleMenuItem[]): SidebarMenuItem {
    return {
      label: this.getLibraryName(library),
      children: (examples || []).map(example => this.getMenuItemForExample(library, example)),
    };
  }

  private getMenuItemForExample(library: string, example: ExampleMenuItem): SidebarMenuItem {
    const exampleMenuGroup = example as ExampleMenuGroup;
    if (exampleMenuGroup.items) {
      const children = exampleMenuGroup.items.map(e => this.getMenuItemForExample(library, e));
      return { label: example.label, children };
    }
    const exampleMenu = example as ExampleMenu;
    const route = exampleMenu.modelId
      ? `/examples/${library}/${exampleMenu.id}/models/${exampleMenu.modelId}`
      : `/examples/${library}/${exampleMenu.id}`;
    return { label: example.label, route };
  }

  private getMenuItemForEditors(library: string): SidebarMenuItem {
    return {
      label: this.getLibraryName(library),
      route: `/editor/${library}`,
    };
  }
}
