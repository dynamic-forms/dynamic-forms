import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DynamicFormFileUpload } from './dynamic-form-file';

@Directive({
  selector: '[dynamicFormFile]',
  exportAs: 'dynamicFormFile',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: DynamicFormFileDirective, multi: true }],
})
export class DynamicFormFileDirective implements ControlValueAccessor, OnInit, OnChanges {
  private _files: DynamicFormFileUpload[] = null;
  private _fileNames: string[] = null;
  private _fileNamesAsText: string = null;

  protected _onChange: any;
  protected _onTouched: any;

  @Input()
  acceptFiles = '';

  @Input()
  multipleFiles = false;

  constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  get files(): DynamicFormFileUpload[] { return this._files; }
  get fileNames(): string[] { return this._fileNames; }
  get fileNamesAsText(): string { return this._fileNamesAsText; }

  ngOnInit(): void {
    this.nativeElement.type = 'file';
    this.nativeElement.hidden = true;
    this.nativeElement.accept = this.acceptFiles;
    this.nativeElement.multiple = this.multipleFiles;
  }

  ngOnChanges({ acceptFiles, multipleFiles }: SimpleChanges): void {
    if (!acceptFiles?.firstChange) {
      this.nativeElement.accept = this.acceptFiles;
    }
    if (!multipleFiles?.firstChange) {
      this.nativeElement.multiple = this.multipleFiles;
      if (this.multipleFiles) {
        this.changeFiles();
      } else if (this._files?.length > 0) {
        this.setFiles([ this._files[0] ]);
      }
    }
  }

  openFileExplorer(): void {
    this.nativeElement.click();
  }

  @HostListener('change', ['$event.target.files'])
  uploadFiles(fileList: FileList): void {
    const files = Array.from(fileList).map(file => new DynamicFormFileUpload(file));
    this.setFiles(files);
    this._onTouched?.();
  }

  writeValue(_value: any): void {
    this.setFiles(null, false);
    this.nativeElement.value = '';
  }

  registerOnChange(onChange: any): void {
    this._onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this._onTouched = onTouched;
  }

  private get nativeElement(): HTMLInputElement {
    return this.elementRef.nativeElement;
  }

  private changeFiles(): void {
    this._onChange?.(this.multipleFiles ? this._files : this._files?.[0] || null);
  }

  private setFiles(files: DynamicFormFileUpload[], changeFiles: boolean = true): void {
    if (!files?.length) {
      this._files = null;
      this._fileNames = null;
      this._fileNamesAsText = null;

    } else {
      this._files = files;
      this._fileNames = this.multipleFiles ? this._files.map(f => f.name) : [ this._files[0].name ];
      this._fileNamesAsText = this._fileNames.join(', ');
    }

    if (changeFiles) {
      this.changeFiles();
    }
  }
}
