// components/mdx-content.tsx
import { useMDXComponents } from "@/mdx-components";
import type { ComponentType } from "react";

interface MDXContentProps {
  component: ComponentType<{
    components?: ReturnType<typeof useMDXComponents>;
  }>;
}

export function MDXContent({ component: Component }: MDXContentProps) {
  const components = useMDXComponents({});
  return <Component components={components} />;
}
