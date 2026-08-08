import type { WorkflowChart } from "@/lib/presentations/types";

type Props = {
  chart: WorkflowChart;
  accent: string;
};

/** Editorial horizontal workflow — hairlines, not soft cards */
export function WorkflowNodeChart({ chart, accent }: Props) {
  return (
    <div
      className="overflow-hidden border px-4 py-5 md:px-6 md:py-6"
      style={{ borderColor: `${accent}40` }}
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-xl">
          <h3
            className="text-lg tracking-tight md:text-xl"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {chart.title}
          </h3>
          <p className="mt-1 text-xs opacity-55 md:text-sm">{chart.subtitle}</p>
        </div>
      </div>

      <div className="hidden overflow-x-auto pb-1 md:block">
        <div className="flex min-w-min items-stretch">
          {chart.nodes.map((node, i) => (
            <div key={node.id} className="flex items-stretch">
              <div
                className="flex w-[7.5rem] flex-col px-3 py-3"
                style={{ background: `${accent}14`, borderLeft: `2px solid ${accent}` }}
              >
                <p className="font-mono text-[9px] opacity-40">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 text-[12px] font-medium leading-snug">{node.label}</p>
                {node.detail ? (
                  <p className="mt-1 text-[10px] leading-snug opacity-50">{node.detail}</p>
                ) : null}
              </div>
              {i < chart.nodes.length - 1 ? (
                <div className="flex w-5 items-center justify-center">
                  <span className="text-xs" style={{ color: accent }}>
                    →
                  </span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <ol className="space-y-0 md:hidden">
        {chart.nodes.map((node, i) => (
          <li key={node.id} className="relative flex gap-3 pb-4 last:pb-0">
            {i < chart.nodes.length - 1 ? (
              <span
                className="absolute left-[11px] top-7 bottom-0 w-px"
                style={{ background: accent, opacity: 0.35 }}
              />
            ) : null}
            <span
              className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center font-mono text-[10px] text-white"
              style={{ background: accent }}
            >
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-medium">{node.label}</p>
              {node.detail ? <p className="text-xs opacity-55">{node.detail}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
