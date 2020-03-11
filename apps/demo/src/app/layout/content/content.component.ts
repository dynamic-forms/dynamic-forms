import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Layout, LAYOUT } from '../../state/layout/layout.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  @Select(LAYOUT)
  layout$: Observable<Layout>;

  mobileQuery: MediaQueryList;

  constructor(private media: MediaMatcher) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
  }
}
