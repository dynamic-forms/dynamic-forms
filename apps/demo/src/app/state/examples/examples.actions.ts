import { ExamplesMenu } from './examples.model';

export class ExamplesInit {
  static readonly type: string = '[Examples] INIT';
  constructor(public menu: ExamplesMenu) {}
}
