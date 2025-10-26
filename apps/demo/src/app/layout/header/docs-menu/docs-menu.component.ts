import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Repository } from '../../../state/config/config.model';
import { ConfigState } from '../../../state/config/config.state';
import { DocsMenuItemsComponent } from './docs-menu-items.component';

@Component({
  selector: 'app-docs-menu',
  imports: [AsyncPipe, RouterLink, RouterLinkActive, MatButtonModule, MatIconModule, MatMenuModule, DocsMenuItemsComponent],
  templateUrl: './docs-menu.component.html',
})
export class DocsMenuComponent {
  readonly repository$: Observable<Repository> = inject(Store).select(ConfigState.repository);
}
