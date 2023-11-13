import { Routes } from '@angular/router';
import { getFormExampleRoutes } from '../form-example-routes';
import { MaterialExamplesComponent } from './material-examples.component';

export const materialExamplesRoutes: Routes = getFormExampleRoutes(MaterialExamplesComponent);

