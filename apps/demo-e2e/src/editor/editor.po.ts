import { Page } from '../page-base';

export class EditorPage extends Page {
  constructor(public theme: string) {
    super(`/editor/${theme}`);
  }
}
