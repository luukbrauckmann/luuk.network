import type { APIRoute } from "astro";
import { locales } from "@assets/site.json"
import { executeQuery } from "@lib/datocms";
import { parse } from "graphql";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  let { locale } = params;
  if (!locale) {
    locale = locales[0];
    const referer = request.headers.get("referer");
    if (referer) {
      const url = new URL(referer);
      locale = url.pathname.split("/")[1];
    }
  }

  const { allPages } = await executeQuery(parse(`
    query BlogPostsQuery($pageType: String!, $locale: SiteLocale!) {
      allPages(filter: {pageType: {eq: $pageType}}, locale: $locale) {
        id
        pageType
        title
      }
    }
    `),
    {
      pageType: "blog_post",
      locale
    },
  );

  return new Response(
    JSON.stringify({
      data: allPages,
    }),
  );
};
