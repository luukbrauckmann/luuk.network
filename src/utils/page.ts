import type { PageQuery } from "@generated/datocms"
import { isNonNullChain } from "typescript"

type NonNullablePage = NonNullable<PageQuery['page']>
type NonNullableContent = NonNullable<NonNullablePage['content']>
type ContentTypes = NonNullableContent['__typename']

export type Page<T extends ContentTypes> = Omit<NonNullablePage, 'content'> & {
  content: Extract<NonNullableContent, { __typename: T }>
}
