import { Page } from '../page-base';

export class ExamplesPage extends Page {
  constructor(theme: string) {
    super(`/examples/${theme}`);
  }
}
