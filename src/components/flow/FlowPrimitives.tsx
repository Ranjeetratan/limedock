"use client";

import { ReactNode } from "react";

/**
 * Flowchart primitives — a small, purpose-built system for building the
 * technical-drawing style diagrams on the marketing site. Deliberately
 * different from the layout cards: neutral fills, hairline borders, visible
 * arrowheads, a dotted grid backdrop so it reads as a diagram, not a
 * bento layout.
 *
 * Every diagram is an SVG with a fixed viewBox so it scales cleanly. Use
 * `FlowCanvas` as the outer wrapper and compose `Node`, `Edge`, and
 * `Label` inside it.
 */

type FlowCanvasProps = {
  /** viewBox width in SVG user units */
  width: number;
  /** viewBox height in SVG user units */
  height: number;
  /** Show the graph-paper dotted backdrop */
  grid?: boolean;
  /** Extra tailwind classes for the outer wrapper */
  className?: string;
  children: ReactNode;
};

export function FlowCanvas({
  width,
  height,
  grid = true,
  className = "",
  children,
}: FlowCanvasProps) {
  const dotStroke = "rgba(24,29,38,0.14)";
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden
        style={{
          width: "100%",
          height: "auto",
          minWidth: Math.min(width, 520),
          display: "block",
        }}
      >
        <defs>
          <marker
            id="flow-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#181d26" />
          </marker>
          <marker
            id="flow-arrow-muted"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(24,29,38,0.55)" />
          </marker>
          <pattern
            id="flow-grid"
            x="0"
            y="0"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.9" fill={dotStroke} />
          </pattern>
        </defs>
        {grid && (
          <rect x="0" y="0" width={width} height={height} fill="url(#flow-grid)" />
        )}
        {children}
      </svg>
    </div>
  );
}

type NodeTone = "default" | "accent" | "muted" | "highlight";

const TONE_STYLES: Record<
  NodeTone,
  { fill: string; stroke: string; text: string; subText: string }
> = {
  default: {
    fill: "#ffffff",
    stroke: "rgba(24,29,38,0.28)",
    text: "#181d26",
    subText: "rgba(24,29,38,0.6)",
  },
  muted: {
    fill: "rgba(255,255,255,0.7)",
    stroke: "rgba(24,29,38,0.18)",
    text: "rgba(24,29,38,0.68)",
    subText: "rgba(24,29,38,0.48)",
  },
  accent: {
    fill: "#181d26",
    stroke: "#181d26",
    text: "#ffffff",
    subText: "rgba(255,255,255,0.72)",
  },
  highlight: {
    // Signature peach — draws the eye to a single key node in the diagram
    fill: "#fcab79",
    stroke: "#e08a56",
    text: "#181d26",
    subText: "rgba(24,29,38,0.7)",
  },
};

type FlowNodeProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  tone?: NodeTone;
  /** Optional 2-char / 3-char code shown as a small pill in the top-right */
  badge?: string;
};

export function FlowNode({
  x,
  y,
  w,
  h,
  label,
  sub,
  tone = "default",
  badge,
}: FlowNodeProps) {
  const t = TONE_STYLES[tone];
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x={0}
        y={0}
        width={w}
        height={h}
        rx={6}
        fill={t.fill}
        stroke={t.stroke}
        strokeWidth={1.25}
      />
      {badge && (
        <g transform={`translate(${w - 34}, 8)`}>
          <rect
            width={26}
            height={14}
            rx={7}
            fill={tone === "accent" ? "rgba(255,255,255,0.16)" : "rgba(24,29,38,0.06)"}
            stroke="none"
          />
          <text
            x={13}
            y={10}
            textAnchor="middle"
            fontSize={8}
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill={t.subText}
          >
            {badge}
          </text>
        </g>
      )}
      <text
        x={12}
        y={sub ? h / 2 - 2 : h / 2 + 4}
        fontSize={12}
        fontWeight={500}
        fill={t.text}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        {label}
      </text>
      {sub && (
        <text
          x={12}
          y={h / 2 + 14}
          fontSize={10}
          fill={t.subText}
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

type EdgeProps = {
  /** Absolute start point in SVG coords */
  from: [number, number];
  /** Absolute end point in SVG coords */
  to: [number, number];
  /** Draw as dashed for optional/parallel paths */
  dashed?: boolean;
  /** Mute the color for secondary edges */
  muted?: boolean;
  /** Show arrowhead at the end (default true) */
  arrow?: boolean;
  /** Optional midpoint label */
  label?: string;
  /** How the line bends: "straight" | "orthogonal" | "curve" */
  shape?: "straight" | "orthogonal" | "curve";
};

export function FlowEdge({
  from,
  to,
  dashed = false,
  muted = false,
  arrow = true,
  label,
  shape = "orthogonal",
}: EdgeProps) {
  const [x1, y1] = from;
  const [x2, y2] = to;

  let d = "";
  if (shape === "straight") {
    d = `M ${x1} ${y1} L ${x2} ${y2}`;
  } else if (shape === "curve") {
    const mx = (x1 + x2) / 2;
    d = `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
  } else {
    // orthogonal: horizontal-then-vertical or vertical-then-horizontal
    const mx = (x1 + x2) / 2;
    d = `M ${x1} ${y1} L ${mx} ${y1} L ${mx} ${y2} L ${x2} ${y2}`;
  }

  const stroke = muted ? "rgba(24,29,38,0.42)" : "#181d26";
  const markerId = muted ? "flow-arrow-muted" : "flow-arrow";

  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={1.25}
        strokeDasharray={dashed ? "4 3" : undefined}
        markerEnd={arrow ? `url(#${markerId})` : undefined}
      />
      {label && (
        <g transform={`translate(${midX}, ${midY - 6})`}>
          <rect
            x={-Math.max(24, label.length * 3.6)}
            y={-8}
            width={Math.max(48, label.length * 7.2)}
            height={14}
            rx={4}
            fill="#ffffff"
            stroke="rgba(24,29,38,0.16)"
            strokeWidth={0.75}
          />
          <text
            x={0}
            y={2}
            textAnchor="middle"
            fontSize={9}
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill="rgba(24,29,38,0.7)"
          >
            {label}
          </text>
        </g>
      )}
    </g>
  );
}

type LabelProps = {
  x: number;
  y: number;
  text: string;
  /** Font size in px within the SVG viewport */
  size?: number;
  /** Text color CSS value */
  color?: string;
  align?: "start" | "middle" | "end";
  mono?: boolean;
};

export function FlowLabel({
  x,
  y,
  text,
  size = 10,
  color = "rgba(24,29,38,0.6)",
  align = "start",
  mono = true,
}: LabelProps) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fill={color}
      textAnchor={align}
      fontFamily={
        mono
          ? "ui-monospace, SFMono-Regular, Menlo, monospace"
          : "ui-sans-serif, system-ui, sans-serif"
      }
      style={{ letterSpacing: "0.06em", textTransform: "uppercase" }}
    >
      {text}
    </text>
  );
}

/**
 * A small pill-shaped input node used for "raw inputs" in a flowchart —
 * data sources, upstream tools, etc. Rendered as a rounded rectangle
 * with no left-side accent line.
 */
export function FlowChip({
  x,
  y,
  w,
  h,
  label,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x={0}
        y={0}
        width={w}
        height={h}
        rx={h / 2}
        fill="#ffffff"
        stroke="rgba(24,29,38,0.28)"
        strokeWidth={1}
      />
      <text
        x={w / 2}
        y={h / 2 + 3.5}
        textAnchor="middle"
        fontSize={10}
        fill="#181d26"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        {label}
      </text>
    </g>
  );
}
