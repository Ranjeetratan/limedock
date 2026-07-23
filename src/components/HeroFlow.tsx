"use client";

import { motion } from "framer-motion";

/**
 * Animated hero flowchart. A four-node loop that shows how a founder's
 * ask travels through the LimeDock platform, out to their surfaces, and
 * comes back as an outcome. Every edge has a continuous pulse dot
 * animated via <animateMotion>, and each node lights up in sequence as
 * its incoming pulse arrives — so the diagram reads as a live workflow,
 * not a static illustration.
 *
 * The stroke language, dotted grid, and node shapes match the
 * `flow/FlowPrimitives` set used elsewhere on the site.
 */
export default function HeroFlow() {
  // Node geometry (SVG user units, 480x480 viewBox)
  const nodes = [
    { id: "you", cx: 240, cy: 60, w: 152, h: 62, label: "Founder ask", sub: "in Slack, CLI, email" },
    { id: "platform", cx: 380, cy: 240, w: 176, h: 68, label: "LimeDock platform", sub: "your infra · your data" },
    { id: "surfaces", cx: 240, cy: 420, w: 200, h: 62, label: "Marketing / Sales OS", sub: "auto-drafts + acts" },
    { id: "outcome", cx: 100, cy: 240, w: 152, h: 62, label: "Outcome", sub: "back to you" },
  ];

  const nodeRect = (n: (typeof nodes)[number]) => ({
    x: n.cx - n.w / 2,
    y: n.cy - n.h / 2,
  });

  // Edge paths (curved between node edges, wrapping around clockwise)
  const paths = [
    { id: "e1", d: "M 316 91 C 380 100, 470 160, 468 209" },   // you → platform
    { id: "e2", d: "M 468 271 C 470 340, 380 380, 316 389" },  // platform → surfaces
    { id: "e3", d: "M 164 389 C 100 380, 12 340, 12 271" },    // surfaces → outcome
    { id: "e4", d: "M 12 209 C 12 160, 100 100, 164 91" },     // outcome → you (dashed)
  ];

  // Sequential highlight — each node lights up as the pulse arrives on it.
  // 4 edges × 2.4s = 9.6s full loop.
  const CYCLE = 9.6;
  const stepDelay = CYCLE / 4;
  const nodeHighlight = (i: number) => ({
    animate: {
      fill: ["#ffffff", "#181d26", "#ffffff"],
    },
    transition: {
      duration: 1.2,
      delay: i * stepDelay,
      repeat: Infinity,
      repeatDelay: CYCLE - 1.2,
      ease: "easeInOut" as const,
    },
  });
  const nodeTextHighlight = (i: number) => ({
    animate: { fill: ["#181d26", "#ffffff", "#181d26"] },
    transition: {
      duration: 1.2,
      delay: i * stepDelay,
      repeat: Infinity,
      repeatDelay: CYCLE - 1.2,
      ease: "easeInOut" as const,
    },
  });
  const nodeSubHighlight = (i: number) => ({
    animate: {
      fill: ["rgba(24,29,38,0.6)", "rgba(255,255,255,0.72)", "rgba(24,29,38,0.6)"],
    },
    transition: {
      duration: 1.2,
      delay: i * stepDelay,
      repeat: Infinity,
      repeatDelay: CYCLE - 1.2,
      ease: "easeInOut" as const,
    },
  });

  return (
    <div className="relative w-full aspect-square max-w-[480px]">
      <svg
        viewBox="0 0 480 480"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Animated workflow loop showing founder ask travelling through the LimeDock platform"
        className="w-full h-full"
      >
        <defs>
          <marker
            id="hero-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#181d26" />
          </marker>
          <pattern
            id="hero-grid"
            x="0"
            y="0"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.9" fill="rgba(24,29,38,0.14)" />
          </pattern>
          <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(252,171,121,0.35)" />
            <stop offset="100%" stopColor="rgba(252,171,121,0)" />
          </radialGradient>
        </defs>

        {/* Grid backdrop, softened by a warm halo behind the platform node */}
        <rect x="0" y="0" width="480" height="480" fill="url(#hero-grid)" />
        <circle cx="380" cy="240" r="180" fill="url(#hero-glow)" />

        {/* Edges (solid for forward flow, dashed for return path) */}
        {paths.map((p, i) => (
          <path
            key={p.id}
            id={p.id}
            d={p.d}
            fill="none"
            stroke="#181d26"
            strokeWidth={1.25}
            strokeDasharray={i === 3 ? "4 3" : undefined}
            opacity={i === 3 ? 0.55 : 1}
            markerEnd={`url(#hero-arrow)`}
          />
        ))}

        {/* Traveling pulse dots — one per edge, staggered so they loop
            round the diagram in sequence */}
        {paths.map((p, i) => (
          <circle
            key={`pulse-${p.id}`}
            r={4}
            fill="#fcab79"
            stroke="#181d26"
            strokeWidth={1}
          >
            <animateMotion
              dur={`${CYCLE}s`}
              repeatCount="indefinite"
              rotate="auto"
              keyPoints={`${i / 4};${(i + 1) / 4};${(i + 1) / 4}`}
              keyTimes="0;0.25;1"
              calcMode="linear"
            >
              <mpath href={`#compound-loop`} />
            </animateMotion>
          </circle>
        ))}

        {/* Compound loop path so a single animateMotion drives all 4 edges
            in one continuous sweep (better than 4 separate motions). */}
        <path
          id="compound-loop"
          d={`${paths[0].d} ${paths[1].d.replace("M", "L")} ${paths[2].d.replace(
            "M",
            "L"
          )} ${paths[3].d.replace("M", "L")}`}
          fill="none"
          stroke="none"
        />

        {/* Nodes */}
        {nodes.map((n, i) => {
          const r = nodeRect(n);
          return (
            <g key={n.id}>
              <motion.rect
                x={r.x}
                y={r.y}
                width={n.w}
                height={n.h}
                rx={8}
                initial={{ fill: "#ffffff" }}
                stroke="#181d26"
                strokeWidth={1.25}
                {...nodeHighlight(i)}
              />
              <motion.text
                x={n.cx}
                y={n.cy - 2}
                textAnchor="middle"
                fontSize={13}
                fontWeight={500}
                initial={{ fill: "#181d26" }}
                fontFamily="ui-sans-serif, system-ui, sans-serif"
                {...nodeTextHighlight(i)}
              >
                {n.label}
              </motion.text>
              <motion.text
                x={n.cx}
                y={n.cy + 14}
                textAnchor="middle"
                fontSize={10}
                initial={{ fill: "rgba(24,29,38,0.6)" }}
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                {...nodeSubHighlight(i)}
              >
                {n.sub}
              </motion.text>
            </g>
          );
        })}

        {/* Loop label in the center — reminds viewers this is a closed loop */}
        <g transform="translate(240, 240)">
          <circle r={44} fill="rgba(255,255,255,0.9)" stroke="rgba(24,29,38,0.16)" />
          <text
            y={-8}
            textAnchor="middle"
            fontSize={9}
            fill="rgba(24,29,38,0.55)"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            style={{ letterSpacing: "0.14em", textTransform: "uppercase" }}
          >
            weekly
          </text>
          <text
            y={6}
            textAnchor="middle"
            fontSize={11}
            fontWeight={600}
            fill="#181d26"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            loop
          </text>
          <text
            y={22}
            textAnchor="middle"
            fontSize={9}
            fill="rgba(24,29,38,0.55)"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            style={{ letterSpacing: "0.14em", textTransform: "uppercase" }}
          >
            you own
          </text>
        </g>
      </svg>
    </div>
  );
}
