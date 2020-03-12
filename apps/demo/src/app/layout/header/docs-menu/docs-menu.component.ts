import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Config, CONFIG } from '../../../state/config/config.model';

@Component({
  selector: 'app-docs-menu',
  templateUrl: './docs-menu.component.html',
  styleUrls: ['./docs-menu.component.scss']
})
export class DocsMenuComponent {
  @Select(CONFIG)
  config$: Observable<Config>;
}
