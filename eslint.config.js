// @ts-nocheck
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const eslintPluginImport = require('eslint-plugin-import');
const eslintPluginUnusedImports = require("eslint-plugin-unused-imports");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = tseslint.config(
  {
    ignores: ["apps/demo/src/assets/"]
  },
  {
    files: ["**/*.ts"],
    plugins: {
      "unused-imports": eslintPluginUnusedImports,
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsAll,
      // @ts-ignore
      eslintPluginImport.flatConfigs.recommended,
      eslintPluginImport.flatConfigs.typescript,
      eslintPluginPrettierRecommended
    ],
    processor: angular.processInlineTemplates,
    settings: {
      "import/resolver": {
        "typescript": {
          "project": "./tsconfig.lint.json"
        }
      }
    },
    rules: {
      "@angular-eslint/use-injectable-provided-in": "off",
      "@angular-eslint/prefer-on-push-component-change-detection": "off",
      "@angular-eslint/prefer-signals": "off",
      "@angular-eslint/prefer-standalone": "error",
      "@typescript-eslint/consistent-type-definitions": "error",
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          "accessibility": "no-public"
        }
      ],
      "@typescript-eslint/member-ordering": [
        "error",
        {
          "default": [
            "private-static-field",
            "protected-static-field",
            "public-static-field",
            "private-instance-field",
            "protected-instance-field",
            "public-instance-field",
            "private-constructor",
            "protected-constructor",
            "public-constructor",
            "public-static-method",
            "public-instance-method",
            "protected-static-method",
            "protected-instance-method",
            "private-static-method",
            "private-instance-method"
          ]
        }
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": [
            "enumMember"
          ],
          "format": [
            "PascalCase"
          ]
        }
      ],
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-empty-interface": [
        "error",
        {
          "allowSingleExtends": true
        }
      ],
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_"
        }
      ],
      "arrow-body-style": [
        "error",
        "as-needed",
        {
          "requireReturnForObjectLiteral": true
        }
      ],
      "comma-dangle": [
        "error",
        "always-multiline"
      ],
      "id-blacklist": "off",
      "id-match": "off",
      "import/order": [
        "error",
        {
          "pathGroups": [
            {
              "pattern": "@dynamic-forms/**",
              "group": "external"
            }
          ],
          "newlines-between": "never",
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          }
        }
      ],
      "prettier/prettier": [
        "error"
      ],
      "no-console": "error",
      "no-underscore-dangle": "off",
      "sort-imports": [
        "error",
        {
          "ignoreCase": false,
          "ignoreDeclarationSort": true,
          "ignoreMemberSort": false,
          "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
          "allowSeparatedGroups": false
        }
      ],
      "unused-imports/no-unused-imports": "error"
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateAll,
      eslintPluginPrettierRecommended
    ],
    rules: {
      "@angular-eslint/template/click-events-have-key-events": "off",
      "@angular-eslint/template/cyclomatic-complexity": "off",
      "@angular-eslint/template/i18n": "off",
      "@angular-eslint/template/interactive-supports-focus": "off",
      "prettier/prettier": [
        "error",
        {
          "parser": "angular",
          "htmlWhitespaceSensitivity": "strict"
        }
      ]
    },
  }
);
