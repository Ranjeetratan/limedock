"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TiltCard from "./motion/TiltCard";

const products = [
  {
    title: "Kingdom of Kumar",
    description:
      "A playful directory of useful AI micro-products and everyday experiments.",
    image: "/kingdomofkumar.png",
    link: "https://kingdomofkumar.com/",
    tags: ["AI directory", "community"],
    surface: "bg-signature-peach",
    span: "lg:col-span-7",
  },
  {
    title: "Hireschema",
    description:
      "Resume scanning and interview prep that turns messy job posts into clear next steps.",
    image: "/Hireschema.png",
    link: "https://www.hireschema.com/",
    tags: ["career tool", "AI"],
    surface: "bg-signature-mint",
    span: "lg:col-span-5",
  },
  {
    title: "Kickofflist",
    description:
      "SEO and GEO optimization workflows for teams that need discoverability to compound.",
    image: "/Kickofflist.png",
    link: "https://kickofflist.tech/",
    tags: ["growth", "SEO"],
    surface: "bg-signature-cream",
    span: "lg:col-span-5",
  },
  {
    title: "Cofounderbase",
    description:
      "A founder and co-founder community with a private operator network behind it.",
    image: "/Cofounderbase.png",
    link: "https://cofounderbase.com/",
    tags: ["community", "network"],
    surface: "bg-signature-yellow",
    span: "lg:col-span-7",
  },
];

export default function FeaturedProducts() {
  return (
    <section
      id="products"
      className="section-air bg-canvas overflow-hidden"
    >
      <div className="container-air">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 grid lg:grid-cols-[0.7fr_0.5fr] gap-8 items-end"
        >
          <div>
            <span className="eyebrow">
              <span className="dot" />
              Products
            </span>
            <h2 className="text-display-md text-ink mt-7 max-w-xl">
              We ship our own things too. Taste is better when it has shipped.
            </h2>
          </div>
          <p className="text-label-md text-body leading-[1.45] max-w-md lg:justify-self-end">
            These are live products and communities from the LimeDock orbit,
            built with the same production muscle we bring to client work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.58, delay: (index % 2) * 0.07 }}
              className={`${product.span}`}
            >
              <TiltCard className="rounded-[10px]" max={5} spotlight>
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`demo-card card-luminous soft-hairline ${product.surface} group min-h-[430px] flex flex-col relative`}
                >
                  {/* Image */}
                  <div className="relative flex-1 min-h-[240px] rounded-md bg-canvas/70 soft-hairline overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(min-width: 1024px) 620px, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>

                  {/* Content */}
                  <div className="pt-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <h3 className="text-title-lg text-ink">{product.title}</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-ink/15 px-3 py-1 text-caption text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-body-md text-body leading-[1.55] mt-3 max-w-md">
                        {product.description}
                      </p>
                    </div>

                    {/* Visit button — clean, in the content area */}
                    <span className="shrink-0 self-end inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-canvas/80 px-4 py-2 text-caption text-ink transition-all duration-300 group-hover:bg-ink group-hover:text-canvas group-hover:border-ink">
                      Visit site
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
