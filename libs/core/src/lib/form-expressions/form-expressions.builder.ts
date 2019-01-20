import { Injectable } from '@angular/core';
import { ExpressionFunction, ExpressionDependency } from './form-expressions.model';

@Injectable()
export class FormExpressionsBuilder {
  createExpressionDependencies(_expression: string): ExpressionDependency[] {
    return [];
  }

  createExpressionFunction(expression: string): ExpressionFunction {
    return new Function('data', `return ${ expression };`);
  }
}
