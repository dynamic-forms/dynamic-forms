import { CodeUrlPipe } from './code-url.pipe';

describe('CodeUrlPipe', () => {
  const repository = {
    url: 'https://github.com/dynamic-forms/dynamic-forms',
    branch: '21.0.x',
    branchPath: 'tree/{{branch}}',
    libraryPath: 'libs/{{library}}',
    appPath: 'apps/{{app}}',
  };

  let pipe: CodeUrlPipe;

  beforeEach(() => {
    pipe = new CodeUrlPipe();
  });

  it('returns branch path', () => {
    expect(pipe.transform(repository)).toBe('https://github.com/dynamic-forms/dynamic-forms/tree/21.0.x');
  });

  it('returns branch path for library', () => {
    expect(pipe.transform(repository, { library: 'core' })).toBe('https://github.com/dynamic-forms/dynamic-forms/tree/21.0.x/libs/core');
  });

  it('returns branch path for app', () => {
    expect(pipe.transform(repository, { app: 'demo' })).toBe('https://github.com/dynamic-forms/dynamic-forms/tree/21.0.x/apps/demo');
  });
});
