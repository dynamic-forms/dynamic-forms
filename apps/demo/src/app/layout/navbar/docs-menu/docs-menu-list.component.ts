import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-docs-menu-list',
  templateUrl: './docs-menu-list.component.html',
  styleUrls: ['./docs-menu-list.component.scss']
})
export class DocsMenuListComponent {
  @Input()
  library: string;

  get codeUrl() {
    const query = `path=%2Flibs%2F${ this.library }%2Fsrc&version=GBmaster`;
    return `https://dev.azure.com/alexandergebuhr/_git/dynamic-forms?${ query }`;
  }
}
