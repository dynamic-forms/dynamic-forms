import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-docs-menu-items',
  templateUrl: './docs-menu-items.component.html',
  styleUrls: ['./docs-menu-items.component.scss']
})
export class DocsMenuItemsComponent {
  @Input()
  library: string;

  get codeUrl() {
    const query = `path=%2Flibs%2F${ this.library }%2Fsrc&version=GBmaster`;
    return `https://dev.azure.com/alexandergebuhr/_git/dynamic-forms?${ query }`;
  }
}
