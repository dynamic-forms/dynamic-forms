import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExamplesMenuItem } from './examples-menu';
import { ExamplesMenuService } from './examples-menu.service';

@Component({
  selector: 'app-examples-menu',
  templateUrl: './examples-menu.component.html',
  styleUrls: ['./examples-menu.component.scss'],
  providers: [
    ExamplesMenuService
  ]
})
export class ExamplesMenuComponent {
  menuItems$: Observable<ExamplesMenuItem[]>;

  constructor(private examplesMenuService: ExamplesMenuService) {
    this.menuItems$ = this.examplesMenuService.getMenu().pipe(
      map(menu => menu.items)
    );
  }
}
