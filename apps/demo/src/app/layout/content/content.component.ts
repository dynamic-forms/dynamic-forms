import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LAYOUT, Layout } from '../../state/layout/layout.model';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  standalone: true,
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  imports: [CommonModule, MatCardModule, MatSidenavModule, RouterModule, SidebarComponent],
})
export class ContentComponent {
  readonly mobileQuery: MediaQueryList;

  @Select(LAYOUT)
  layout$: Observable<Layout>;

  constructor(private media: MediaMatcher) {
    this.mobileQuery = this.media.matchMedia('(max-width: 850px)');
  }
}
