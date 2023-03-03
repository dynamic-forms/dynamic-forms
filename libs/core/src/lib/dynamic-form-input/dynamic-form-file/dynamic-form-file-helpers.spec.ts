import { DynamicFormFileUpload } from './dynamic-form-file';
import { extractFiles } from './dynamic-form-file-helpers';

describe('DynamicFormFileHelpers', () => {
  it('extractFiles returns empty array', () => {
    const result = extractFiles(null);

    expect(result.length).toBe(0);
  });

  it('extractFiles returns array with single file item', () => {
    const file = new File([''], 'file01.txt', { type: 'text/plain' });
    const fileUpload = new DynamicFormFileUpload(file);

    const result = extractFiles({ fileUpload });

    expect(result.length).toBe(1);
    expect(result[0].key).toBe('fileUpload');
    expect(result[0].file).toBe(file);
  });

  it('extractFiles returns array with single file item from wrapped object', () => {
    const file = new File([''], 'file01.txt', { type: 'text/plain' });
    const fileUpload = new DynamicFormFileUpload(file);

    const result = extractFiles({ registration: { username: 'user01', email: 'user01@mail.com', files: { fileUpload } } });

    expect(result.length).toBe(1);
    expect(result[0].key).toBe('registration.files.fileUpload');
    expect(result[0].file).toBe(file);
  });

  it('extractFiles returns array with multiple file items', () => {
    const files = [
      new File([''], 'file01.txt', { type: 'text/plain' }),
      new File([''], 'file02.json', { type: 'application/json' }),
    ];
    const fileUploads = [
      new DynamicFormFileUpload(files[0]),
      new DynamicFormFileUpload(files[1]),
    ];

    const result = extractFiles({ fileUploads });

    expect(result.length).toBe(2);
    expect(result[0].key).toBe('fileUploads.0');
    expect(result[0].file).toBe(files[0]);
    expect(result[1].key).toBe('fileUploads.1');
    expect(result[1].file).toBe(files[1]);
  });

  it('extractFiles returns array with multiple file items from wrapped object', () => {
    const files = [
      new File([''], 'file01.txt', { type: 'text/plain' }),
      new File([''], 'file02.json', { type: 'application/json' }),
    ];
    const fileUploads = [
      new DynamicFormFileUpload(files[0]),
      new DynamicFormFileUpload(files[1]),
    ];

    const result = extractFiles({ registration: { username: 'user01', email: 'user01@mail.com', files: { fileUploads } } });

    expect(result.length).toBe(2);
    expect(result[0].key).toBe('registration.files.fileUploads.0');
    expect(result[0].file).toBe(files[0]);
    expect(result[1].key).toBe('registration.files.fileUploads.1');
    expect(result[1].file).toBe(files[1]);
  });
});
