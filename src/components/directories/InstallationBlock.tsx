type Props = {
  content: string;
};

/** Renders installation text; fenced code blocks become <pre>. */
export default function InstallationBlock({ content }: Props) {
  const parts = content.split(/```(?:bash|sh|shell|zsh)?\n?([\s\S]*?)```/g);

  if (parts.length === 1) {
    return (
      <p className="text-body-md text-body whitespace-pre-wrap leading-[1.6]">
        {content}
      </p>
    );
  }

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
          <p
            key={index}
            className="text-body-md text-body whitespace-pre-wrap leading-[1.6]"
          >
            {part.trim()}
          </p>
        );
      })}
    </div>
  );
}
