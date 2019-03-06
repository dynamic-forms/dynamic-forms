import { ProgressItem } from './progress.model';

export class ProgressItemPush {
  static readonly type = '[ProgressItem] PUSH';
  constructor(public item: ProgressItem) {}
}

export class ProgressItemPop {
  static readonly type = '[ProgressItem] POP';
  constructor(public item: ProgressItem) {}
}
