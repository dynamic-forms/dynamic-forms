import { DynamicFormLogLevel } from '@dynamic-forms/core';
import { FormEditorLogLevelPipe } from './form-editor-log-level.pipe';

describe('FormEditorLogLevelPipe', () => {
  let pipe: FormEditorLogLevelPipe;

  beforeEach(() => {
    pipe = new FormEditorLogLevelPipe();
  });

  it('returns', () => {
    expect(pipe.transform(DynamicFormLogLevel.Error)).toBe('Error');
    expect(pipe.transform(DynamicFormLogLevel.Warning)).toBe('Warning');
    expect(pipe.transform(DynamicFormLogLevel.Information)).toBe('Information');
    expect(pipe.transform(DynamicFormLogLevel.Debug)).toBe('Debug');
  });
});
