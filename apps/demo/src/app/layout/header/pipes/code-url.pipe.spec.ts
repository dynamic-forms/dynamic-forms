import { CodeUrlPipe } from './code-url.pipe';

describe('CodeUrlPipe', () => {
  const repository = {
    url: 'https://github.com/dynamic-forms/dynamic-forms',
    branch: '21.0.x',
    branchPath: 'tree/{{branch}}',
    libraryPath: 'libs/{{library}}',
  };

  let pipe: CodeUrlPipe;

  beforeEach(() => {
    pipe = new CodeUrlPipe();
  });

  it('returns branch path', () => {
    expect(pipe.transform(repository, null)).toBe('https://github.com/dynamic-forms/dynamic-forms/tree/21.0.x');
  });

  it('returns branch path for library', () => {
    expect(pipe.transform(repository, 'core')).toBe('https://github.com/dynamic-forms/dynamic-forms/tree/21.0.x/libs/core');
  });
});
