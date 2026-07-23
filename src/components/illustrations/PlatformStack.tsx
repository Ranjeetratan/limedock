/**
 * 3D-line illustration — isometric stack of the three workflow families
 * LimeDock ships (marketing, sales, management), drawn as monoline
 * panels on a subtle dotted-grid backdrop. Same stroke language as the
 * flowchart primitives so the site reads as one visual system.
 *
 * This is the reference implementation of the "3D line illustration
 * with little blended grid bg" style — clone the shape here to place
 * illustrations elsewhere on the site.
 */
export default function PlatformStack({
  className = "",
  size = 320,
}: {
  className?: string;
  size?: number;
}) {
  // Iso projection helpers — 30° axes, so x = X, y = Y, and depth Z
  // contributes (cos30 · Z, sin30 · Z) to the 2D coordinates.
  const cos30 = Math.cos(Math.PI / 6);
  const sin30 = Math.sin(Math.PI / 6);
  const iso = (X: number, Y: number, Z: number) => ({
    x: X * cos30 - Z * cos30,
    y: X * sin30 + Z * sin30 + Y,
  });

  // Each panel is a flat 3D rectangle (60 wide × 42 deep × 0 tall)
  // stacked vertically at three Y positions.
  const PANEL_W = 240; // width in iso X
  const PANEL_D = 130; // depth in iso Z
  const panels = [
    { y: -12, fill: "#fcab79", accent: "MARKETING", tag: "content · attribution" },
    { y: 32, fill: "#a8d8c4", accent: "SALES", tag: "scoring · sequencing" },
    { y: 76, fill: "#f4d35e", accent: "MANAGEMENT", tag: "digests · standup" },
  ];

  // Convert panel to path
  const panelPath = (yOff: number) => {
    const a = iso(0, yOff, 0);
    const b = iso(PANEL_W, yOff, 0);
    const c = iso(PANEL_W, yOff, PANEL_D);
    const d = iso(0, yOff, PANEL_D);
    return `M ${a.x} ${a.y} L ${b.x} ${b.y} L ${c.x} ${c.y} L ${d.x} ${d.y} Z`;
  };

  // Coordinates the SVG needs to translate to so panels sit visually centered
  const OFFSET_X = 60;
  const OFFSET_Y = 40;

  return (
    <svg
      viewBox="0 0 360 300"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Isometric line illustration of marketing, sales, and management workflows stacked as three panels"
      className={className}
      width={size}
      style={{ height: "auto" }}
    >
      <defs>
        <pattern
          id="platform-stack-grid"
          x="0"
          y="0"
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="0.9" fill="rgba(24,29,38,0.16)" />
        </pattern>
        <linearGradient id="platform-stack-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.9)" />
        </linearGradient>
      </defs>

      {/* Dotted grid backdrop blended with a soft top-to-bottom fade */}
      <rect x="0" y="0" width="360" height="300" fill="url(#platform-stack-grid)" />
      <rect x="0" y="0" width="360" height="300" fill="url(#platform-stack-fade)" />

      <g transform={`translate(${OFFSET_X}, ${OFFSET_Y})`}>
        {/* Vertical connector — the "spine" that ties the three panels
            together, drawn behind the panels */}
        {(() => {
          const top = iso(PANEL_W / 2, panels[0].y - 6, PANEL_D / 2);
          const bottom = iso(PANEL_W / 2, panels[panels.length - 1].y + 6, PANEL_D / 2);
          return (
            <line
              x1={top.x}
              y1={top.y}
              x2={bottom.x}
              y2={bottom.y}
              stroke="rgba(24,29,38,0.32)"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
          );
        })()}

        {panels.map((p, i) => (
          <g key={p.accent}>
            {/* Filled panel with hairline stroke */}
            <path
              d={panelPath(p.y)}
              fill={p.fill}
              stroke="#181d26"
              strokeWidth={1.25}
              opacity={0.94}
            />

            {/* Iso grid lines inside the panel — 3 across, 2 back */}
            {[1, 2].map((k) => {
              const startEdge = iso(0, p.y, (PANEL_D / 3) * k);
              const endEdge = iso(PANEL_W, p.y, (PANEL_D / 3) * k);
              return (
                <line
                  key={`h-${i}-${k}`}
                  x1={startEdge.x}
                  y1={startEdge.y}
                  x2={endEdge.x}
                  y2={endEdge.y}
                  stroke="rgba(24,29,38,0.35)"
                  strokeWidth={0.6}
                />
              );
            })}
            {[1, 2, 3].map((k) => {
              const startEdge = iso((PANEL_W / 4) * k, p.y, 0);
              const endEdge = iso((PANEL_W / 4) * k, p.y, PANEL_D);
              return (
                <line
                  key={`v-${i}-${k}`}
                  x1={startEdge.x}
                  y1={startEdge.y}
                  x2={endEdge.x}
                  y2={endEdge.y}
                  stroke="rgba(24,29,38,0.35)"
                  strokeWidth={0.6}
                />
              );
            })}

            {/* Label pill floating above each panel */}
            {(() => {
              const anchor = iso(PANEL_W - 74, p.y - 4, PANEL_D - 22);
              return (
                <g transform={`translate(${anchor.x}, ${anchor.y})`}>
                  <rect
                    x={0}
                    y={-14}
                    width={94}
                    height={20}
                    rx={4}
                    fill="#ffffff"
                    stroke="#181d26"
                    strokeWidth={1}
                  />
                  <text
                    x={47}
                    y={0}
                    textAnchor="middle"
                    fontSize={8}
                    fill="#181d26"
                    fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                    style={{ letterSpacing: "0.14em" }}
                  >
                    {p.accent}
                  </text>
                </g>
              );
            })()}
          </g>
        ))}

        {/* Small floating "API key" tag anchored to the bottom of the stack */}
        {(() => {
          const anchor = iso(-14, panels[panels.length - 1].y + 44, PANEL_D - 40);
          return (
            <g transform={`translate(${anchor.x}, ${anchor.y})`}>
              <path
                d="M 0 0 L 34 -18"
                stroke="rgba(24,29,38,0.55)"
                strokeWidth={1}
                strokeDasharray="3 2"
              />
              <rect
                x={-58}
                y={-4}
                width={64}
                height={20}
                rx={4}
                fill="#ffffff"
                stroke="#181d26"
                strokeWidth={1}
              />
              <text
                x={-26}
                y={10}
                textAnchor="middle"
                fontSize={9}
                fill="#181d26"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              >
                API keys
              </text>
            </g>
          );
        })()}
      </g>
    </svg>
  );
}
