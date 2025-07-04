import type { AstroIntegration } from "astro";
import { loadEnv } from "vite";
import { generate } from '@graphql-codegen/cli'

const { DATOCMS_TOKEN } = loadEnv(
  process.env.NODE_ENV!,
  process.cwd(),
  ""
);

export default function codegen(): AstroIntegration {
  return {
    name: "codegen",
    hooks: {
      "astro:config:setup": async ({ logger }) => {
        generate({
          schema: {
            "https://graphql.datocms.com": {
              headers: {
                Authorization: DATOCMS_TOKEN
              }
            }
          },
          documents: ["**/*.graphql"],
          generates: {
            ".generated/datocms-types.ts": {
              plugins: ["typescript", "typescript-operations", "typed-document-node"],
              config: {
                dedupeFragments: true,
                strictScalars: true,
                scalars: {
                  BooleanType: "boolean",
                  CustomData: "Record<string, unknown>",
                  Date: "string",
                  DateTime: "string",
                  FloatType: "number",
                  IntType: "number",
                  ItemId: "string",
                  JsonField: "unknown",
                  MetaTagAttributes: "Record<string, string>",
                  UploadId: "string"
                }
              }
            }
          }
        })
        logger.info("Generated");
      }
    }
  };
}
