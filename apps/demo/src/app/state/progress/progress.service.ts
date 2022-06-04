import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProgressItemPop, ProgressItemPush } from './progress.actions';
import { ProgressItem } from './progress.model';

@Injectable()
export class ProgressService {
  constructor(private store: Store) {}

  execute(action: Observable<any>, item: ProgressItem): void {
    this.store.dispatch(new ProgressItemPush(item));
    action.subscribe({
      complete: () => this.store.dispatch(new ProgressItemPop(item)),
    });
  }
}
