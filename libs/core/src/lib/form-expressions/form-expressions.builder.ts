import { Injectable } from '@angular/core';
import { FormExpressions, ExpressionFunction, Expression, ExpressionDependency } from './form-expressions.model';

@Injectable()
export class FormExpressionsBuilder {
  createExpressions(expressions: { [key: string]: string }): FormExpressions {
    return expressions ? Object.keys(expressions).reduce((result, key) => {
      result[key] = this.createExpression(expressions[key]);
      return result;
    }, {}) : null;
  }

  private createExpression(expression: string): Expression {
    const deps = this.createExpressionDependencies(expression);
    const func = this.createExpressionFunction(expression);
    const value = { value: null };
    return { deps, func, value };
  }

  private createExpressionDependencies(_expression: string): ExpressionDependency[] {
    return [];
  }

  private createExpressionFunction(expression: string): ExpressionFunction {
    return new Function('model', 'parentModel', 'rootModel', `return ${ expression };`);
  }
}
