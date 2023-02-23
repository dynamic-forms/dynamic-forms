import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DynamicFormFileUpload } from './dynamic-form-file';

@Directive({
  selector: '[dynamicFormFile]',
  exportAs: 'dynamicFormFile',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: DynamicFormFileDirective, multi: true }],
})
export class DynamicFormFileDirective implements ControlValueAccessor, OnInit {
  private _files: DynamicFormFileUpload[];
  private _fileNames: string[];
  private _fileNamesAsText: string;

  protected _onChange: any;
  protected _onTouched: any;

  @Input()
  acceptFiles = '';

  @Input()
  multipleFiles = false;

  constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  get fileNames(): string[] { return this._fileNames; }
  get fileNamesAsText(): string { return this._fileNamesAsText; }

  ngOnInit(): void {
    this.elementRef.nativeElement.type = 'file';
    this.elementRef.nativeElement.hidden = true;
    this.elementRef.nativeElement.accept = this.acceptFiles;
    this.elementRef.nativeElement.multiple = this.multipleFiles;
  }

  openFileExplorer(): void {
    this.elementRef.nativeElement.click();
  }

  @HostListener('change', ['$event.target.files'])
  uploadFiles(fileList: FileList): void {
    this._files = Array.from(fileList).map(file => new DynamicFormFileUpload(file));
    this._fileNames = this.multipleFiles ? this._files.map(f => f.name) : [ this._files[0].name ];
    this._fileNamesAsText = this._fileNames.join(', ');
    this._onChange(this.multipleFiles ? this._files : this._files[0]);
  }

  writeValue(_value: any): void {
    this._files = null;
    this.elementRef.nativeElement.value = '';
  }

  registerOnChange(onChange: any): void {
    this._onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this._onTouched = onTouched;
  }
}
