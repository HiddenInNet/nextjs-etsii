import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,

    // 1. Titular Principal (Headline)
    h1: ({ children }) => (
      <h1 className="mt-12 mb-6 border-b-8 border-neutral-950 pb-4 font-serif text-4xl font-black tracking-tight text-neutral-950 uppercase sm:text-5xl md:text-6xl">
        {children}
      </h1>
    ),

    // 2. Subtítulos informáticos (Terminal vibe)
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 flex items-center gap-3 font-mono text-2xl font-bold tracking-wide text-neutral-950 uppercase">
        <span className="text-purple-600">##</span>
        {children}
      </h2>
    ),

    // 3. Subtítulos menores (Estilo sección de periódico)
    h3: ({ children }) => (
      <h3 className="mt-8 mb-4 border-l-4 border-purple-600 pl-3 font-serif text-xl font-bold text-neutral-900 italic">
        {children}
      </h3>
    ),

    // 4. Párrafos editoriales
    p: ({ children }) => (
      <p className="mb-6 font-serif text-lg leading-relaxed text-neutral-800 sm:text-xl">
        {children}
      </p>
    ),

    // 5. Citas destacadas (Pull Quotes) - Neobrutalistas
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-4 border-neutral-950 bg-white p-6 font-serif text-xl font-medium text-neutral-900 italic md:shadow-[8px_8px_0_#0a0a0a] sm:p-8 sm:text-2xl">
        {children}
      </blockquote>
    ),

    // 6. Enlaces interactivos
    a: ({ href, children }) => {
      const isExternal = href?.startsWith("http");
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : "_self"}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="border-b-2 border-purple-600 font-bold text-neutral-950 transition-colors hover:bg-purple-600 hover:text-white"
        >
          {children}
        </a>
      );
    },

    // 7. Listas (sustituye los bullets normales por cursores tech)
    ul: ({ children }) => (
      <ul className="mb-6 flex flex-col gap-3 font-serif text-lg text-neutral-800">
        {children}
      </ul>
    ),
    li: ({ children }) => (
      <li className="flex items-start gap-3">
        <span className="mt-1 font-mono text-sm font-black text-purple-600">
          {">"}
        </span>
        <span>{children}</span>
      </li>
    ),

    // 8. Código en línea (Efecto "Subrayador fluorescente")
    code: ({ children }) => (
      <code className="rounded border-2 border-neutral-950 bg-yellow-300 px-1.5 py-0.5 font-mono text-sm font-bold text-neutral-950 md:shadow-[2px_2px_0_#0a0a0a]">
        {children}
      </code>
    ),

    // 9. Bloques de código (Terminal estilo Mac OS / Neobrutalista)
    pre: ({ children }) => (
      <div className="my-8 overflow-hidden rounded-xl border-4 border-neutral-950 md:shadow-[8px_8px_0_#0a0a0a]">
        {/* Falsa barra superior de ventana */}
        <div className="flex items-center gap-2 border-b-4 border-neutral-950 bg-neutral-200 px-4 py-2">
          <div className="h-3 w-3 rounded-full border-2 border-neutral-950 bg-red-500" />
          <div className="h-3 w-3 rounded-full border-2 border-neutral-950 bg-yellow-400" />
          <div className="h-3 w-3 rounded-full border-2 border-neutral-950 bg-green-500" />
          <div className="ml-auto font-mono text-[10px] font-bold text-neutral-500 uppercase">
            bash
          </div>
        </div>
        <pre className="overflow-x-auto bg-neutral-950 p-6 font-mono text-sm text-neutral-100">
          {children}
        </pre>
      </div>
    ),

    // 10. Separadores editoriales
    hr: () => (
      <hr className="my-14 border-t-4 border-dashed border-neutral-950" />
    ),

    // 11. Imágenes de la noticia
    img: (props) => (
      <span className="my-10 block overflow-hidden border-4 border-neutral-950 md:shadow-[8px_8px_0_#0a0a0a]">
        <img
          {...props}
          className="h-auto w-full object-cover grayscale transition-all duration-500 hover:scale-105 hover:grayscale-0"
          alt={props.alt || "Imagen de la noticia"}
        />
      </span>
    ),
  };
}
