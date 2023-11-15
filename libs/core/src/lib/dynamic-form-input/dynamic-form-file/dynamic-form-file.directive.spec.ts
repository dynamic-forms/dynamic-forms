import { SimpleChange } from '@angular/core';
import { DynamicFormFileDirective } from './dynamic-form-file.directive';

describe('DynamicFormFileDirective', () => {
  let nativeElement: HTMLInputElement;
  let directive: DynamicFormFileDirective;

  beforeEach(() => {
    nativeElement = { click: () => {} } as HTMLInputElement;
    directive = new DynamicFormFileDirective({ nativeElement });
  });

  it('returns initial values', () => {
    expect(directive.files).toBeNull();
    expect(directive.fileNames).toBeNull();
    expect(directive.fileNamesAsText).toBeNull();
  });

  it('ngOnInit sets properties of native element', () => {
    directive.ngOnInit();

    expect(nativeElement.type).toBe('file');
    expect(nativeElement.hidden).toBeTrue();
    expect(nativeElement.accept).toBe('');
    expect(nativeElement.multiple).toBeFalse();
    expect(nativeElement.value).toBeUndefined();
  });

  it('ngOnChanges updates accept of native element', () => {
    directive.acceptFiles = '*.txt';
    directive.ngOnChanges({ acceptFiles: { firstChange: false } as SimpleChange });

    expect(nativeElement.accept).toBe('*.txt');
  });

  it('ngOnChanges does not update accept of native element if not first change', () => {
    directive.acceptFiles = '*.txt';
    directive.ngOnChanges({ acceptFiles: { firstChange: true } as SimpleChange });

    expect(nativeElement.accept).toBeUndefined();
  });

  it('ngOnChanges updates multiple of native element', () => {
    directive.multipleFiles = true;
    directive.ngOnChanges({ multipleFiles: { firstChange: false } as SimpleChange });

    expect(nativeElement.multiple).toBeTrue();
  });

  it('ngOnChanges updates multiple of native element and cuts files', () => {
    const handler = { onChange: _value => {} };

    spyOn(handler, 'onChange');

    const files = [new File([''], 'file01.txt', { type: 'text/plain' }), new File([''], 'file02.json', { type: 'application/json' })];

    directive.registerOnChange(handler.onChange);

    directive.multipleFiles = true;
    directive.ngOnChanges({ multipleFiles: { firstChange: false } as SimpleChange });

    expect(handler.onChange).toHaveBeenCalledWith(null);

    directive.uploadFiles(files as unknown as FileList);

    expect(nativeElement.multiple).toBeTrue();
    expect(directive.files.length).toBe(2);

    expect(handler.onChange).toHaveBeenCalledWith([
      jasmine.objectContaining({ name: 'file01.txt', type: 'text/plain', size: 0 }),
      jasmine.objectContaining({ name: 'file02.json', type: 'application/json', size: 0 }),
    ]);

    directive.multipleFiles = false;
    directive.ngOnChanges({ multipleFiles: { firstChange: false } as SimpleChange });

    expect(nativeElement.multiple).toBeFalse();
    expect(directive.files.length).toBe(1);

    expect(handler.onChange).toHaveBeenCalledWith(jasmine.objectContaining({ name: 'file01.txt', type: 'text/plain', size: 0 }));
  });

  it('ngOnChanges does not update multiple of native element if not first change', () => {
    directive.multipleFiles = true;
    directive.ngOnChanges({ multipleFiles: { firstChange: true } as SimpleChange });

    expect(nativeElement.multiple).toBeUndefined();
  });

  it('openFileExplorer clicks native element', () => {
    spyOn(nativeElement, 'click');

    directive.openFileExplorer();

    expect(nativeElement.click).toHaveBeenCalledTimes(1);
  });

  it('uploadFiles sets files with multipleFiles being false', () => {
    const handler = { onChange: _value => {}, onTouched: () => {} };

    spyOn(handler, 'onChange');
    spyOn(handler, 'onTouched');

    const file = new File([''], 'file.txt', { type: 'text/plain' });

    directive.registerOnChange(handler.onChange);
    directive.registerOnTouched(handler.onTouched);
    directive.uploadFiles([file] as unknown as FileList);

    expect(directive.files.length).toBe(1);
    expect(directive.files[0].file).toBe(file);
    expect(directive.files[0].toJSON()).toEqual({ name: 'file.txt', type: 'text/plain', size: 0 });
    expect(directive.fileNames).toEqual(['file.txt']);
    expect(directive.fileNamesAsText).toBe('file.txt');

    expect(handler.onChange).toHaveBeenCalledWith(jasmine.objectContaining({ name: 'file.txt', type: 'text/plain', size: 0 }));
    expect(handler.onTouched).toHaveBeenCalledTimes(1);
  });

  it('uploadFiles sets files with multipleFiles being true', () => {
    const handler = { onChange: _value => {}, onTouched: () => {} };

    spyOn(handler, 'onChange');
    spyOn(handler, 'onTouched');

    const files = [new File([''], 'file01.txt', { type: 'text/plain' }), new File([''], 'file02.json', { type: 'application/json' })];

    directive.multipleFiles = true;
    directive.registerOnChange(handler.onChange);
    directive.registerOnTouched(handler.onTouched);
    directive.uploadFiles(files as unknown as FileList);

    expect(directive.files.length).toBe(2);
    expect(directive.files[0].file).toBe(files[0]);
    expect(directive.files[0].toJSON()).toEqual({ name: 'file01.txt', type: 'text/plain', size: 0 });
    expect(directive.files[1].file).toBe(files[1]);
    expect(directive.files[1].toJSON()).toEqual({ name: 'file02.json', type: 'application/json', size: 0 });
    expect(directive.fileNames).toEqual(['file01.txt', 'file02.json']);
    expect(directive.fileNamesAsText).toBe('file01.txt, file02.json');

    expect(handler.onChange).toHaveBeenCalledWith([
      jasmine.objectContaining({ name: 'file01.txt', type: 'text/plain', size: 0 }),
      jasmine.objectContaining({ name: 'file02.json', type: 'application/json', size: 0 }),
    ]);
    expect(handler.onTouched).toHaveBeenCalledTimes(1);
  });

  it('writeValue sets files to null and value of native element to empty string', () => {
    directive.writeValue({});

    expect(directive.files).toBeNull();
    expect(directive.fileNames).toBeNull();
    expect(directive.fileNamesAsText).toBeNull();
    expect(nativeElement.value).toBe('');
  });
});
