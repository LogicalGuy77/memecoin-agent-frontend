import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { LightBulbIcon } from "@heroicons/react/24/outline";

function AnalysisDisplay({ analysis }) {
  if (!analysis) {
    return null;
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 shadow-lg transition-all duration-300 hover:border-zinc-700">
      <div className="flex items-center gap-2 mb-5 border-b border-zinc-800 pb-3">
        <LightBulbIcon className="h-5 w-5 text-yellow-500" />
        <h2 className="text-xl font-bold text-white">Analysis Results</h2>
      </div>

      <div
        className="prose prose-invert prose-sm max-w-none 
                      prose-headings:text-zinc-300 
                      prose-h1:mt-8 prose-h1:mb-4
                      prose-h2:mt-7 prose-h2:mb-3
                      prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
                      prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:my-3
                      prose-a:text-blue-400 
                      prose-code:bg-zinc-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                      prose-strong:text-zinc-200
                      prose-li:text-zinc-400 prose-li:my-1.5
                      prose-ol:space-y-2 prose-ol:my-4 
                      prose-ul:space-y-2 prose-ul:my-4
                      prose-hr:border-zinc-700"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-md border border-zinc-700 text-sm my-4"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code
                  className="bg-zinc-800 px-1 py-0.5 rounded text-zinc-300"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            li({ children }) {
              return <li className="pl-1 mb-2">{children}</li>;
            },
            ol({ children }) {
              return <ol className="pl-5 space-y-3 mb-4">{children}</ol>;
            },
            ul({ children }) {
              return <ul className="pl-5 space-y-2 mb-4">{children}</ul>;
            },
          }}
        >
          {analysis}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default AnalysisDisplay;
