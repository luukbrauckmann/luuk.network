declare module '*.graphql' {
  import { DocumentNode } from '@datocms/cda-client';

  const content: DocumentNode;
  export default content;
}
