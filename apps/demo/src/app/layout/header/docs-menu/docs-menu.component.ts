import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Repository } from '../../../state/config/config.model';
import { ConfigState } from '../../../state/config/config.state';

@Component({
  selector: 'app-docs-menu',
  templateUrl: './docs-menu.component.html',
  styleUrls: ['./docs-menu.component.scss']
})
export class DocsMenuComponent {
  @Select(ConfigState.repository)
  repository$: Observable<Repository>;
}
