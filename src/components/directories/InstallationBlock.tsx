type Props = {
  content: string;
};

/** Renders installation / how-to text; fenced code blocks become <pre>, ### become headings. */
export default function InstallationBlock({ content }: Props) {
  const parts = content.split(/```(?:bash|sh|shell|zsh|text)?\n?([\s\S]*?)```/g);

  return (
    <div className="space-y-4">
      {parts.map((part, index) => {
        if (!part.trim()) return null;
        const isCode = index % 2 === 1;
        if (isCode) {
          return (
            <pre
              key={index}
              className="overflow-x-auto rounded-md border border-hairline bg-surface-dark-elevated p-4 text-[13px] leading-[1.55] text-on-dark"
            >
              <code>{part.trim()}</code>
            </pre>
          );
        }

        return (
          <div key={index} className="space-y-3">
            {part
              .trim()
              .split(/\n{2,}/)
              .map((block, blockIndex) => {
                const lines = block.split("\n");
                if (lines[0]?.startsWith("### ")) {
                  return (
                    <div key={blockIndex} className="space-y-2">
                      <h3 className="text-title-sm text-ink">
                        {lines[0].replace(/^###\s+/, "")}
                      </h3>
                      {lines.slice(1).join("\n").trim() ? (
                        <p className="text-body-md text-body whitespace-pre-wrap leading-[1.65]">
                          {lines.slice(1).join("\n").trim()}
                        </p>
                      ) : null}
                    </div>
                  );
                }
                if (lines[0]?.startsWith("**") && lines[0]?.endsWith("**") && lines.length === 1) {
                  return (
                    <p key={blockIndex} className="text-body-md font-medium text-ink">
                      {lines[0].replace(/^\*\*|\*\*$/g, "")}
                    </p>
                  );
                }
                return (
                  <p
                    key={blockIndex}
                    className="text-body-md text-body whitespace-pre-wrap leading-[1.65]"
                  >
                    {block.trim()}
                  </p>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}
