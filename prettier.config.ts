import { type Config } from "prettier";

const config: Config = {
  trailingComma: "none",
  plugins: ["prettier-plugin-astro", "prettier-plugin-css-order"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro"
      }
    }
  ]
};

export default config;
