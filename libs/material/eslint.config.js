// @ts-check
const tseslint = require("typescript-eslint");
const rootConfig = require("../../eslint.config.js");

module.exports = tseslint.config(
  ...rootConfig,
  {
    files: ["**/*.ts"],
    rules: {
      "@angular-eslint/component-selector": [
        "error",
        {
          "type": "element",
          "prefix": "mat-dynamic",
          "style": "kebab-case"
        }
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          "type": "attribute",
          "prefix": "mat-dynamic",
          "style": "camelCase"
        }
      ],
    },
  },
  {
    files: ["**/*.html"],
    rules: {},
  }
);
