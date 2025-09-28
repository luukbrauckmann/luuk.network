import translations from "@generated/translations.json";

function convertICUMessageFormat(
  str: string,
  values: Record<string, string | number>
) {
  return str.replace(/\{(\w+)\}/g, (_, match) =>
    values[match] !== undefined ? String(values[match]) : `{${match}}`
  );
}

export function useTranslations(locale: keyof typeof translations) {
  return {
    t: function <K extends keyof (typeof translations)[typeof locale]>(
      key: K,
      values?: Record<string, string | number>
    ) {
      if (!values) {
        return translations[locale][key];
      }
      return convertICUMessageFormat(translations[locale][key], values);
    },
    n: function (value: number, options?: Intl.NumberFormatOptions) {
      return new Intl.NumberFormat(locale, options).format(value);
    },
    d: function (value: Date, options?: Intl.DateTimeFormatOptions) {
      return new Intl.DateTimeFormat(locale, options).format(value);
    }
  };
}
