import { locales } from ".astro/site.json";

export const getPath = ({ locale, page }: { locale: string, page?: any }) => {
  if (!page) {
    return `/${locale}/`;
  }

  const params = [page.slug];
  let parentPage = page.parentPage;
  while (parentPage) {
    params.unshift(parentPage.slug);
    parentPage = parentPage.parentPage;
  }

  return `/${locale}/${params.join("/")}/`;
};

export const getLocalizedPaths = (page: any) => {
  const paths = {};

  locales.forEach((locale) => {
    const slug = page._allSlugLocales.find((slugLocale) => slugLocale.locale === locale).value;
    const params = [slug];

    let parentPage = page.parentPage;
    while (parentPage) {
      const parentSlug = parentPage._allSlugLocales.find((slugLocale) => slugLocale.locale === locale).value;
      params.unshift(parentSlug);
      parentPage = parentPage.parentPage;
    }

    Object.assign(paths, { [locale]: `/${locale}/${params.join("/")}/` });
  });

  return paths;
};
