/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
    trailingComma: 'none',
    semi: true,
    singleQuote: true,
    plugins: ['prettier-plugin-astro', 'prettier-plugin-css-order'],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
    ],
};

export default config;
