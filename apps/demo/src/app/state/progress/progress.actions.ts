import { ProgressItem } from './progress.model';

export class ProgressItemPush {
  static readonly type: string = '[ProgressItem] PUSH';
  constructor(public item: ProgressItem) {}
}

export class ProgressItemPop {
  static readonly type: string = '[ProgressItem] POP';
  constructor(public item: ProgressItem) {}
}
