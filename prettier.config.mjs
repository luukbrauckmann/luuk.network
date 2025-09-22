const config = {
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
