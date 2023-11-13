import { Routes } from '@angular/router';
import { getFormEditorRoutes } from '../form-editor-routes';
import { BootstrapEditorComponent } from './bootstrap-editor.component';

export const bootstrapEditorRoutes: Routes = getFormEditorRoutes(BootstrapEditorComponent);
