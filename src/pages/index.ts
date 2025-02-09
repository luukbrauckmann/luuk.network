import type { APIRoute } from "astro";
import { pick } from "accept-language-parser";

export const prerender = false;

export const GET: APIRoute = ({ cookies, request, redirect }) => {
  const locales = ["en", "nl"];

  const cookieLocale = cookies.get("locale");
  if (cookieLocale && locales.includes(cookieLocale.value)) {
    return redirect(`/${cookieLocale.value}/`);
  }

  const headersLocale = pick(
    locales,
    request.headers.get("accept-language") || "",
  );
  if (headersLocale) {
    cookies.set("locale", headersLocale);
    return redirect(`/${headersLocale}/`);
  }

  return redirect(`/en/`);
};
