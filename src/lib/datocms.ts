import {
  executeQuery as libExecuteQuery,
  type TypedDocumentNode,
} from "@datocms/cda-client";
import { DATOCMS_TOKEN } from "astro:env/server";

export const executeQuery = <Result = unknown, Variables = unknown>(
  query: TypedDocumentNode<Result, Variables>,
  variables?: Variables
) => {
  return libExecuteQuery(query, {
    token: DATOCMS_TOKEN,
    variables,
  });
};
