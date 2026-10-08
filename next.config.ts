import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Habilita las extensiones .mdx y .md como rutas y módulos válidos
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  // Puedes definir plugins de remark o rehype más adelante
  options: {
    // remarkPlugins: [],
    // rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
