import { useState } from "react";

function ChatInterface({ onSubmit, loading }) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() && !loading) {
      onSubmit(question);
    }
  };

  // Example questions
  const exampleQuestions = [
    "Analyze the top 5 memecoins in detail",
    "Which coins have the most consistent performance?",
    "Compare the top 3 coins and explain their strengths",
    "What makes the #1 coin stand out from others?",
    "Which coins show recent momentum but lack long-term strength?",
  ];

  const handleExampleClick = (q) => {
    setQuestion(q);
    onSubmit(q);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-6">
      <h2 className="text-xl font-bold mb-4">Memecoin Analysis Agent</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex">
          <input
            type="text"
            className="flex-grow px-4 py-2 bg-zinc-800 border border-zinc-700 focus:border-zinc-500 rounded-l-md text-white focus:outline-none"
            placeholder="Ask a question about the memecoin data..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-white text-black font-medium rounded-r-md hover:bg-zinc-200 transition duration-200 disabled:bg-zinc-600 disabled:text-zinc-400"
            disabled={loading || !question.trim()}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Analyze"
            )}
          </button>
        </div>
      </form>

      <div>
        <h3 className="text-sm font-medium text-zinc-400 mb-2">
          Example Questions
        </h3>
        <div className="flex flex-wrap gap-2">
          {exampleQuestions.map((q, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(q)}
              className="text-xs px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-full text-zinc-300 transition duration-200"
              disabled={loading}
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
