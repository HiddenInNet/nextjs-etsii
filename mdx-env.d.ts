import { Frontmatter } from "./types/news/article.interface";

// mdx-env.d.ts
declare module "*.mdx" {
  import type { ComponentType } from "react";

  export const frontmatter: Frontmatter;

  const MDXComponent: ComponentType<any>;
  export default MDXComponent;
}
