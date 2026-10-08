// mdx-env.d.ts
declare module "*.mdx" {
  import type { ComponentType } from "react";

  export const frontmatter: {
    title?: string;
    date?: string;
    [key: string]: any;
  };

  const MDXComponent: ComponentType<any>;
  export default MDXComponent;
}
