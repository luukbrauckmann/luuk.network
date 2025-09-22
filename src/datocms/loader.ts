import type { Loader } from "astro/loaders";
import type {
  AllPagesQuery,
  AllPagesQueryVariables,
  SiteLocale
} from "@generated/datocms";
import { z } from "astro:content";
import { executeQuery } from "@datocms/execute-query";
import query from "@datocms/all-pages.query.graphql";

type Page = AllPagesQuery["allPages"][0] & {
  locale: SiteLocale;
  menu: AllPagesQuery["menu"];
};

async function loadData(locales: SiteLocale[]) {
  return (
    await Promise.all(
      locales.map(async (locale) => {
        const { _site, menu, allPages } = await executeQuery<
          AllPagesQuery,
          AllPagesQueryVariables
        >(query, { locale });
        return allPages.map((page) => ({
          ...page,
          locale,
          menu,
          _seoMetaTags: [...page._seoMetaTags, ..._site.faviconMetaTags]
        }));
      })
    )
  ).flat();
}

export const loader: Loader = {
  name: "datocms",
  load: async ({ config, parseData, store }) => {
    const locales = config.i18n?.locales;
    const data = await loadData(locales as SiteLocale[]);
    const parsedData = await Promise.all(
      data.map(
        async (item) =>
          await parseData({ id: `${item.locale}/${item.path}`, data: item })
      )
    );
    parsedData.map((parsedItem) =>
      store.set({
        id: `${parsedItem.locale}/${parsedItem.path}`,
        data: parsedItem
      })
    );
  },
  schema: z.custom<Page>()
};
