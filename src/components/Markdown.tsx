import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  h1: ({ children }) => <h2 className="font-display text-2xl md:text-3xl font-bold mt-10 mb-4">{children}</h2>,
  h2: ({ children }) => <h2 className="font-display text-xl md:text-2xl font-bold mt-8 mb-3">{children}</h2>,
  h3: ({ children }) => <h3 className="font-display text-lg md:text-xl font-bold mt-6 mb-2">{children}</h3>,
  p: ({ children }) => <p className="leading-relaxed text-foreground/90">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-6 space-y-1.5 marker:text-primary">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-6 space-y-1.5 marker:text-primary">{children}</ol>,
  li: ({ children }) => <li className="text-foreground/90">{children}</li>,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-primary/60 pl-4 italic text-muted-foreground">{children}</blockquote>
  ),
  hr: () => <hr className="border-border my-8" />,
  pre: ({ children }) => (
    <pre className="terminal-card bg-terminal/60 p-4 rounded-md overflow-x-auto my-2 text-sm font-mono">{children}</pre>
  ),
  code: ({ className, children }) => {
    const isBlock = /language-/.test(className ?? "");
    if (isBlock) return <code className="font-mono text-sm text-foreground/90">{children}</code>;
    return (
      <code className="font-mono text-[0.85em] bg-secondary px-1.5 py-0.5 rounded text-primary">{children}</code>
    );
  },
};

export function Markdown({ children }: { children: string }) {
  return (
    <div className="space-y-5">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
