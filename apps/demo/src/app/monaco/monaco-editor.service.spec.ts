import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { first, firstValueFrom } from 'rxjs';
import { MONACO_REF, MonacoRef } from './monaco-editor';
import { MonacoEditorService } from './monaco-editor.service';

describe('MonacoEditorService', () => {
  const createRequire = () => {
    const require = (_, loaded: () => void) => {
      loaded();
    };
    require.config = () => {};
    return require;
  };

  let monacoRef: MonacoRef;
  let service: MonacoEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonacoEditorService, MockProvider(MONACO_REF, { monaco: undefined, require: undefined })],
    });

    monacoRef = TestBed.inject(MONACO_REF);
    service = TestBed.inject(MonacoEditorService);
  });

  it('is not loaded', async () => {
    expect(await firstValueFrom(service.loaded$)).toBeFalse();
    expect(await firstValueFrom(service.loading$)).toBeFalse();
  });

  it('init does not load monaco editor if already loaded', async () => {
    monacoRef.monaco = {};

    service.init();

    expect(await firstValueFrom(service.loaded$)).toBeTrue();
  });

  it('init loads monaco editor', async () => {
    monacoRef.require = createRequire();

    spyOn(monacoRef.require, 'config');
    spyOn(monacoRef, 'require').and.callThrough();

    const wasLoading = firstValueFrom(service.loading$.pipe(first(loading => loading)));

    service.init();

    expect(await wasLoading).toBeTrue();
    expect(await firstValueFrom(service.loading$)).toBeFalse();
    expect(await firstValueFrom(service.loaded$)).toBeTrue();
    expect(monacoRef.require.config).toHaveBeenCalledOnceWith({ paths: { vs: './assets/monaco-editor/min/vs' } });
    expect(monacoRef.require).toHaveBeenCalledOnceWith([`vs/editor/editor.main`], jasmine.any(Function));
  });

  it('init exits early if monaco editor is already loading', () => {
    monacoRef.require = createRequire();

    spyOn(monacoRef.require, 'config');
    spyOn(monacoRef, 'require');

    service.init();
    service.init();

    expect(monacoRef.require).toHaveBeenCalledOnceWith([`vs/editor/editor.main`], jasmine.any(Function));
    expect(monacoRef.require.config).toHaveBeenCalledOnceWith({ paths: { vs: './assets/monaco-editor/min/vs' } });
  });

  it('init loads monaco loader and monaco editor', async () => {
    const scriptElement = {
      addEventListener: (_: string, callback: () => void) => {
        monacoRef.require = createRequire();

        spyOn(monacoRef.require, 'config');
        spyOn(monacoRef, 'require').and.callThrough();

        callback();
      },
    } as HTMLScriptElement;

    spyOn(document, 'createElement').and.returnValue(scriptElement);
    spyOn(document.body, 'appendChild');

    const wasLoading = firstValueFrom(service.loading$.pipe(first(loading => loading)));

    service.init();

    expect(await wasLoading).toBeTrue();
    expect(await firstValueFrom(service.loading$)).toBeFalse();
    expect(await firstValueFrom(service.loaded$)).toBeTrue();
    expect(document.createElement).toHaveBeenCalledOnceWith('script');
    expect(document.body.appendChild).toHaveBeenCalledOnceWith(scriptElement);
    expect(monacoRef.require).toHaveBeenCalledOnceWith([`vs/editor/editor.main`], jasmine.any(Function));
    expect(monacoRef.require.config).toHaveBeenCalledOnceWith({ paths: { vs: './assets/monaco-editor/min/vs' } });
  });

  it('init exits early if monaco loader is already loading', () => {
    const scriptElement = { addEventListener: (_: string, __: () => void) => {} } as HTMLScriptElement;

    spyOn(document, 'createElement').and.returnValue(scriptElement);
    spyOn(document.body, 'appendChild');

    service.init();
    service.init();

    expect(document.createElement).toHaveBeenCalledOnceWith('script');
    expect(document.body.appendChild).toHaveBeenCalledOnceWith(scriptElement);
  });
});
