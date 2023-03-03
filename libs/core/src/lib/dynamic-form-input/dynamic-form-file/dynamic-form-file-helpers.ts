import { DynamicFormFileUpload } from './dynamic-form-file';

export interface FileItem {
  key: string;
  file: File;
}

const extractFilesFromObject = (value: any, path: string = '', files: FileItem[] = []): FileItem[] =>
  Object.entries(value || {}).reduce((result, [key, entry]) => {
    if (entry instanceof DynamicFormFileUpload) {
      result.push({ key: path ? `${path}.${key}` : key, file: entry.file });
    } else if (Array.isArray(entry) || typeof entry === 'object') {
      return extractFilesFromObject(entry, path ? `${path}.${key}` : key, result);
    }
    return result;
  }, files);

export const extractFiles = (value: any): FileItem[] => extractFilesFromObject(value);
