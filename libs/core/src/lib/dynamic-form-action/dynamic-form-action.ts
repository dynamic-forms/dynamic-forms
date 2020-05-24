import { DynamicFormClassType } from '../dynamic-form-config/dynamic-form-class-type';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormActionExpressionData } from '../dynamic-form-expression/dynamic-form-action-expression-data';
import { DynamicFormActionExpressions } from '../dynamic-form-expression/dynamic-form-action-expressions';
import { assignExpressionData } from '../dynamic-form-expression/dynamic-form-expression-helpers';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';
import { DynamicFormActionTemplate } from './dynamic-form-action-template';

export class DynamicFormAction<
  Template extends DynamicFormActionTemplate = DynamicFormActionTemplate,
  Definition extends DynamicFormActionDefinition<Template> = DynamicFormActionDefinition<Template>
> extends DynamicFormElement<Template, Definition, DynamicFormActionExpressionData, DynamicFormActionExpressions> {

  constructor(readonly root: DynamicFormField, readonly parent: DynamicFormElement | DynamicFormField, definition: Definition) {
    super(definition);
  }

  get classType(): DynamicFormClassType { return 'action'; }

  protected createExpressionData(): DynamicFormActionExpressionData {
    const expressionData = {} as DynamicFormActionExpressionData;
    assignExpressionData(expressionData, {
      root: () => this.root ? this.root.expressionData : undefined,
      parent: () => this.parent ? this.parent.expressionData : undefined
    });
    return expressionData;
  }
}
