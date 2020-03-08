import { Component, Inject, Input, OnInit } from '@angular/core';
import { AppConfig, AppRepository, APP_CONFIG } from '../../../app-config';

@Component({
  selector: 'app-docs-menu-items',
  templateUrl: './docs-menu-items.component.html',
  styleUrls: ['./docs-menu-items.component.scss']
})
export class DocsMenuItemsComponent implements OnInit {
  private _codeUrl: string;

  @Input()
  library: string;

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  get codeUrl(): string { return this._codeUrl; }

  ngOnInit(): void {
    const query = this.getQuery();
    this._codeUrl = `${this.repo.url}?${query}`;
  }

  private get repo(): AppRepository { return this.appConfig.repository; }

  private getQuery(): string {
    return this.repo.libraryQuery
      .replace('{{library}}', this.library)
      .replace('{{branch}}', this.repo.branch);
  }
}
