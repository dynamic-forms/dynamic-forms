import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
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
  providers: [CodeUrlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuComponent {
  private readonly store = inject(Store);
  private readonly codeUrlPipe = inject(CodeUrlPipe);

  readonly childrenAccessor: (menuItem: SidebarMenuItem) => SidebarMenuItem[];
  readonly dataSource$: Observable<SidebarMenuItem[]>;

  constructor() {
    this.childrenAccessor = menuItem => menuItem.children ?? [];
    this.dataSource$ = combineLatest([this.store.select(ConfigState.repository), this.store.select(ExamplesState.menuItems)]).pipe(
      map(([repository, examples]) => this.getTreeDataSource(repository, examples)),
    );
  }

  hasChildren = (_: number, menuItem: any) => !!menuItem.children && menuItem.children.length > 0;

  private getTreeDataSource(repository: Repository, examples: ExampleMenuItem[]): SidebarMenuItem[] {
    const libDocsChildren = ['core', 'bootstrap', 'material', 'markdown'].map(library => this.getMenuItemForLibDocs(library, repository));
    const appDocsChildren = ['demo'].map(app => this.getMenuItemForAppDocs(app, repository));
    const examplesChildren = ['bootstrap', 'material'].map(library => this.getMenuItemForExamples(library, examples));
    const editorChildren = ['bootstrap', 'material'].map(library => this.getMenuItemForEditors(library));
    return [
      { label: 'Home', route: '/home' },
      { label: 'Docs', children: [...libDocsChildren, ...appDocsChildren, { label: 'Changelog', route: '/docs/changelog' }] },
      { label: 'Examples', children: examplesChildren },
      { label: 'Editor', children: editorChildren },
      { label: 'License', route: '/license' },
    ];
  }

  private formatName(name: string): string {
    return name.slice(0, 1).toUpperCase() + name.slice(1);
  }

  private getMenuItemForLibDocs(library: string, repository: Repository): SidebarMenuItem {
    const children = [
      { label: 'Code Doc', route: `/docs/${library}/doc` },
      { label: 'Code Coverage', route: `/docs/${library}/coverage` },
    ] as SidebarMenuItem[];
    if (repository) {
      const href = this.codeUrlPipe.transform(repository, { library });
      children.splice(0, 0, { label: 'Code', href });
    }
    return { label: this.formatName(library), children };
  }

  private getMenuItemForAppDocs(app: string, repository: Repository): SidebarMenuItem {
    const children = [{ label: 'Code Coverage', route: `/docs/${app}/coverage` }] as SidebarMenuItem[];
    if (repository) {
      const href = this.codeUrlPipe.transform(repository, { app });
      children.splice(0, 0, { label: 'Code', href });
    }
    return { label: this.formatName(app), children };
  }

  private getMenuItemForExamples(library: string, examples: ExampleMenuItem[]): SidebarMenuItem {
    return {
      label: this.formatName(library),
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
      label: this.formatName(library),
      route: `/editor/${library}`,
    };
  }
}
