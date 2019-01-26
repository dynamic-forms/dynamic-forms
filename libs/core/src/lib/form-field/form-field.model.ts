import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export type FormFieldType = 'group' | 'array' | 'control';
export type FormFieldControl = AbstractControl | FormGroup | FormArray | FormControl;

export interface FormFieldTemplate {
  key: string;
  type: FormFieldType;
  label: string;
  hidden?: boolean;
  expressions?: { [key: string]: string };
}

export type ExpressionFunction = Function;
export type ExpressionDependency = string;

export interface Expression {
  deps: ExpressionDependency[];
  func: ExpressionFunction;
  value: any;
}

export interface FormFieldExpression extends Expression {
  field: FormField;
}

export interface FormFieldExpressions {
  [key: string]: FormFieldExpression;
}

export abstract class FormField<Template extends FormFieldTemplate = FormFieldTemplate,
  Control extends FormFieldControl = FormFieldControl> {

  protected _path: string;
  protected _expressions?: FormFieldExpressions;
  protected _control: Control;
  protected _model: any;

  constructor(
    public readonly root: FormField,
    public readonly parent: FormField,
    public readonly template: Template
  ) {
    this._path = parent && parent.path ? `${parent.path}.${template.key}` : template.key || null;
  }

  get path(): string { return this._path; }
  get control(): Control { return this._control; }
  get model(): any { return this._model; }

  setExpressions(expressions: FormFieldExpressions) {
    this._expressions = expressions;
    if (expressions) {
      Object.keys(expressions).forEach(path => {
        const paths = path.split('.');
        if (paths.length > 1) {
          const key = paths.splice(paths.length - 1, 1)[0];
          const obj = this.createObject(this.template, paths);
          Object.defineProperty(obj, key, { get: function() { return expressions[path].value; } });
        } else {
          Object.defineProperty(this.template, path, { get: function() { return expressions[path].value; } });
        }
      });
    }
  }

  abstract update(): void;
  abstract destroy(): void;

  protected createObject(obj: any, paths: string[]) {
    return paths.reduce((result, path) => {
      result[path] = result[path] || {};
      return result[path];
    }, obj);
  }
}
