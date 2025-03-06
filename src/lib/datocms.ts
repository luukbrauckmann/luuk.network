import {
  executeQuery as libExecuteQuery,
  type TypedDocumentNode,
} from "@datocms/cda-client";
import { DATOCMS_TOKEN } from "astro:env/server";
import { parse } from "graphql";

export const executeQuery = <Result = unknown, Variables = unknown>(
  query: TypedDocumentNode<Result, Variables>,
  variables?: Variables
) => {
  return libExecuteQuery(query, {
    token: DATOCMS_TOKEN,
    variables,
  });
};

export const getStaticPathsFromPages = async () => {
  const { meta } = await executeQuery<{ meta: { count: number } }>(
    parse(`
      query MetaQuery {
        meta: _allPagesMeta {
          count
        }
      }
    `)
  );

  const recordsPerPage = 100;
  const totalPages = Math.ceil(meta.count / recordsPerPage);

  return (
    await Promise.all(
      Array.from({ length: totalPages }).map(async (_, i) => {
        const { pages } = await executeQuery<
          { pages: any },
          { first: number; skip: number }
        >(
          parse(`
          query PagesQuery($first: IntType!, $skip: IntType!) {
            pages: allPages(first: $first, skip: $skip) {
              _allSlugLocales {
                locale
                value
              }
              id
              parentPage {
                _allSlugLocales {
                  locale
                  value
                }
              }
            }
          }
        `),
          { first: recordsPerPage, skip: recordsPerPage * i }
        );

        return pages.map((page) => getPathFromPage(page)).flat();
      })
    )
  ).flat();
};

const getPathFromPage = (page) => {
  return page._allSlugLocales.map((slugLocale) => {
    let path = slugLocale.value;
    let parentPage = page.parentPage;
    while (parentPage) {
      const parentPageSlug = parentPage._allSlugLocales.find(
        (parentSlugLocale) => slugLocale.locale === parentSlugLocale.locale
      );
      path = `${parentPageSlug.value}/${path}`;
      parentPage = parentPage.parentPage;
    }
    return {
      params: {
        locale: slugLocale.locale,
        path,
      },
      props: {
        id: page.id,
      },
    };
  });
};
