"use client";

import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";

import { urlForSanityImage } from "@/sanity/image";
import type { InsightArticle } from "@/sanity/types";

type PortableArticleProps = {
  value: InsightArticle["body"];
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-7 text-[17px] leading-8 text-slate-300">
        {children}
      </p>
    ),

    h2: ({ children }) => (
      <h2 className="mb-6 mt-14 text-3xl font-semibold leading-tight text-white md:text-4xl">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="mb-5 mt-10 text-2xl font-semibold text-white">
        {children}
      </h3>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-2 border-cyan-300 bg-cyan-300/[0.045] px-7 py-6 text-xl italic leading-9 text-cyan-50">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mb-8 space-y-3 pl-6 text-slate-300">
        {children}
      </ul>
    ),

    number: ({ children }) => (
      <ol className="mb-8 list-decimal space-y-3 pl-6 text-slate-300">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="list-disc pl-2 leading-8">{children}</li>
    ),

    number: ({ children }) => (
      <li className="pl-2 leading-8">{children}</li>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-white">
        {children}
      </strong>
    ),

    em: ({ children }) => (
      <em className="italic text-slate-200">{children}</em>
    ),

    link: ({ children, value }) => {
      const href =
        typeof value?.href === "string" ? value.href : "#";

      const external = href.startsWith("http");

      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="font-medium text-cyan-300 underline decoration-cyan-300/30 underline-offset-4 transition hover:text-cyan-100"
        >
          {children}
        </a>
      );
    },
  },

  types: {
    image: ({ value }) => {
      if (!value?.asset) {
        return null;
      }

      const imageUrl = urlForSanityImage(value)
        .width(1400)
        .fit("max")
        .auto("format")
        .url();

      return (
        <figure className="my-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={value.alt ?? ""}
            className="w-full rounded-[2rem] border border-white/10 object-cover"
          />

          {value.caption && (
            <figcaption className="mt-4 text-center text-xs leading-6 text-slate-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function PortableArticle({
  value,
}: PortableArticleProps) {
  return <PortableText value={value} components={components} />;
}