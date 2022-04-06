import { FormData } from '../form/form-data';
import { Example } from '../state/examples/examples.model';

export interface FormExampleData extends FormData {
  example: Example;
}
