import tseslint from "typescript-eslint";
import rootConfig from "../../eslint.config.mjs";

export default tseslint.config(
  ...rootConfig,
  {
    files: ["**/*.ts"],
    rules: {
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "dynamic",
          style: "kebab-case"
        }
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "dynamic",
          style: "camelCase"
        }
      ],
    },
  },
  {
    files: ["**/*.html"],
    rules: {},
  }
);
