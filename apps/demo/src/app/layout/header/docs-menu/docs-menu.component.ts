import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Repository } from '../../../state/config/config.model';
import { ConfigState } from '../../../state/config/config.state';
import { DocsMenuItemsComponent } from './docs-menu-items.component';

@Component({
  standalone: true,
  selector: 'app-docs-menu',
  templateUrl: './docs-menu.component.html',
  styleUrl: './docs-menu.component.scss',
  imports: [AsyncPipe, NgIf, RouterLink, RouterLinkActive, MatButtonModule, MatIconModule, MatMenuModule, DocsMenuItemsComponent],
})
export class DocsMenuComponent {
  @Select(ConfigState.repository)
  repository$: Observable<Repository>;
}
