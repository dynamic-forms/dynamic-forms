import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngxs/store';
import { bufferCount, delay, first, firstValueFrom, of } from 'rxjs';
import { PreferencesState } from '../state/preferences/preferences.state';
import { MonacoEditorComponent } from './monaco-editor.component';

describe('MonacoEditorComponent', () => {
  let fixture: ComponentFixture<MonacoEditorComponent>;
  let component: MonacoEditorComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([PreferencesState])],
      teardown: { destroyAfterEach: false },
    });

    fixture = TestBed.createComponent(MonacoEditorComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
    expect(component.value()).toBeUndefined();
  });

  it('inits editor and updates value', async () => {
    fixture.detectChanges();

    await firstValueFrom(component.loading$.pipe(first(loading => !loading)));

    const editorElement = fixture.debugElement.nativeElement.querySelector('.monaco-editor');

    expect(editorElement).toBeTruthy();

    component['_editor'].setValue('{}');

    expect(component.value()).toEqual('{}');
  });

  it('handles value changes', async () => {
    fixture.componentRef.setInput('value', '{}');
    fixture.detectChanges();

    await firstValueFrom(component.loading$.pipe(first(loading => !loading)));

    expect(component.value()).toEqual('{}');
    expect(component['_editor'].getValue()).toEqual('{}');

    fixture.componentRef.setInput('value', '{ children: [] }');
    fixture.detectChanges();

    expect(component.value()).toEqual('{ children: [] }');
    expect(component['_editor'].getValue()).toEqual('{ children: [] }');
  });

  it('handles file upload', async () => {
    fixture.detectChanges();

    await firstValueFrom(component.loading$.pipe(first(loading => !loading)));

    const file = new File(['{}'], 'test.json', { type: 'application/json' });
    const fileList = { item: (_: number) => file, length: 1 } as FileList;
    const fileLoadingValues = firstValueFrom(component.fileLoading$.pipe(bufferCount(3)));

    component.handleFileUpload(fileList);

    await firstValueFrom(of({}).pipe(delay(500)));

    expect(component.value()).toEqual('{}');
    expect(await fileLoadingValues).toEqual([false, true, false]);
  });

  it('handles file download', () => {
    const linkElement = { click: () => {} } as HTMLAnchorElement;

    spyOn(linkElement, 'click');
    spyOn(document, 'createElement').and.returnValue(linkElement);
    spyOn(URL, 'createObjectURL').and.returnValue('blob:url');
    spyOn(URL, 'revokeObjectURL');

    component.handleFileDownload();

    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(linkElement.click).toHaveBeenCalled();
    expect(linkElement.download).toEqual('dynamic-form.json');
    expect(URL.createObjectURL).toHaveBeenCalledWith(jasmine.any(File));
    expect(URL.revokeObjectURL).toHaveBeenCalled();
  });
});
