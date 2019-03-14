import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LayoutState } from '../../state/layout/layout.state';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  mobileQuery: MediaQueryList;
  layoutState$: Observable<LayoutState>;

  constructor(private store: Store, private media: MediaMatcher) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.layoutState$ = this.store.select(LayoutState);
  }
}
