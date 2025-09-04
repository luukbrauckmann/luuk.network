import type { AllPagesQuery } from "@generated/datocms"

type NonNullablePage = NonNullable<AllPagesQuery['allPages'][0]>
type NonNullableContent = NonNullable<NonNullablePage['content']>
type ContentTypes = NonNullableContent['__typename']

export type Page<T extends ContentTypes> = Omit<NonNullablePage, 'content'> & {
  content: Extract<NonNullableContent, { __typename: T }>
}
