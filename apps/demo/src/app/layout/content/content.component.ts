import { MediaMatcher } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LAYOUT, Layout } from '../../state/layout/layout.model';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-content',
  imports: [AsyncPipe, MatCardModule, MatSidenavModule, RouterOutlet, SidebarComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent {
  readonly mobileQuery: MediaQueryList;
  readonly layout$: Observable<Layout> = inject(Store).select(LAYOUT);

  constructor(private media: MediaMatcher) {
    this.mobileQuery = this.media.matchMedia('(max-width: 850px)');
  }
}
