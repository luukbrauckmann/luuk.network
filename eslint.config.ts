import ts from "typescript-eslint";
import js from "@eslint/js";
import astro from "eslint-plugin-astro";

const config = ts.config([
  js.configs.recommended,
  ts.configs.recommendedTypeChecked,
  astro.configs["flat/recommended"],
  astro.configs["flat/jsx-a11y-strict"],
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    ignores: ["**.astro/**"]
  }
]);

export default config;
