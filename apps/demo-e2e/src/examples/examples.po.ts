import { Page } from '../page-base';

export interface Example {
   id: string;
   modelId: string;
   name: string;
}

export class ExamplesPage extends Page {
  constructor(theme: string) {
    super(`/examples/${theme}`);
  }

  navigateToExample(example: Example): void {
    const relativeUrl = example.modelId ? `${example.id}/models/${example.modelId}` : example.id;
    this.navigateTo(relativeUrl);
  }
}
