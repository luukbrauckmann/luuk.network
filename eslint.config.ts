import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import astro from 'eslint-plugin-astro';

export default defineConfig([
  js.configs.recommended,
  astro.configs["flat/recommended"],
  astro.configs["flat/jsx-a11y-strict"]
]);
