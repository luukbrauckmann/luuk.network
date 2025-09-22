import type { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnv } from "vite";

const { DATOCMS_TOKEN } = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

const config: CodegenConfig = {
  schema: {
    "https://graphql.datocms.com": {
      headers: {
        Authorization: DATOCMS_TOKEN
      }
    }
  },
  documents: [`**/*.graphql`],
  generates: {
    ".generated/datocms.ts": {
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
};

export default config;
