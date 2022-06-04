import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Config, CONFIG } from '../../state/config/config.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  readonly docsQuery: MediaQueryList;
  readonly examplesQuery: MediaQueryList;
  readonly editorsQuery: MediaQueryList;
  readonly versionsQuery: MediaQueryList;

  @Select(CONFIG)
  config$: Observable<Config>;

  constructor(private media: MediaMatcher) {
    this.docsQuery = this.media.matchMedia('(max-width: 825px)');
    this.examplesQuery = this.media.matchMedia('(max-width: 450px)');
    this.editorsQuery = this.media.matchMedia('(max-width: 550px)');
    this.versionsQuery = this.media.matchMedia('(max-width: 675px)');
  }
}
