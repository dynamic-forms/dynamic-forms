import { DynamicFormLog } from '@dynamic-forms/core';
import { FormEditorLogDataPipe } from './form-editor-log-data.pipe';

describe('FormEditorLogDataPipe', () => {
  let pipe: FormEditorLogDataPipe;

  beforeEach(() => {
    pipe = new FormEditorLogDataPipe();
  });

  it('returns from message', () => {
    const log = { data: ['Info'] } as DynamicFormLog;

    expect(pipe.transform(log)).toBe('Info');
  });

  it('returns from error', () => {
    const log = { data: [new Error('Error')] } as DynamicFormLog;

    expect(pipe.transform(log)).toContain('Error: Error');
  });
});
