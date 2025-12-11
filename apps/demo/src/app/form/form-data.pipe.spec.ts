import { FormDataPipe } from './form-data.pipe';

describe('FormDataPipe', () => {
  let pipe: FormDataPipe;

  beforeEach(() => {
    pipe = new FormDataPipe();
  });

  it('returns undefined', () => {
    expect(pipe.transform(null)).toBeUndefined();
  });

  it('returns files', () => {
    const formData = new FormData();
    formData.append('file1', new File(['content'], 'file1.txt'));

    const result = pipe.transform(formData);

    expect(result).toEqual([{ key: 'file1', name: 'file1.txt' }]);
  });
});
