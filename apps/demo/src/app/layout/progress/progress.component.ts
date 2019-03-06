import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProgressItem } from './progress.model';
import { ProgressState } from './progress.state';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {
  items$: Observable<ProgressItem[]>;

  constructor(private store: Store) {
    this.items$ = this.store.select(ProgressState.items);
  }
}
