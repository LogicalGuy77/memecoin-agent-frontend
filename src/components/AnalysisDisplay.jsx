import ReactMarkdown from "react-markdown";

function AnalysisDisplay({ analysis }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Analysis Results</h2>

      <div className="prose prose-invert prose-sm max-w-none">
        <ReactMarkdown>{analysis}</ReactMarkdown>
      </div>
    </div>
  );
}

export default AnalysisDisplay;
