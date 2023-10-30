import { Routes } from '@angular/router';
import { getFormEditorRoutes } from '../form-editor-routes';
import { MaterialEditorComponent } from './material-editor.component';

export const materialEditorRoutes: Routes = getFormEditorRoutes(MaterialEditorComponent);

