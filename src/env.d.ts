/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SITE: string;
  readonly OUTPUT: "static" | "server";
  readonly DATOCMS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.graphql" {
  import { TypedDocumentNode } from "@datocms/cda-client";
  const value: TypedDocumentNode;
  export = value;
}
