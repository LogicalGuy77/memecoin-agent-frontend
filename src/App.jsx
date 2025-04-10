import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import TopCoins from "./components/TopCoins";
import ChatInterface from "./components/ChatInterface";
import MarketInfo from "./components/MarketInfo";
import AnalysisDisplay from "./components/AnalysisDisplay";
import Footer from "./components/Footer";
import axios from "axios";

function App() {
  const [topCoins, setTopCoins] = useState([]);
  const [marketCondition, setMarketCondition] = useState("");
  const [weights, setWeights] = useState({});
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch top coins on initial load
  useEffect(() => {
    fetchTopCoins();
  }, []);

  const fetchTopCoins = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      console.log("Fetching top coins...");
      const response = await axios.get("/top-coins");
      console.log("Top coins data received:", response.data);
      setTopCoins(response.data);
      setLoading(false);
    } catch (err) {
      // Error handling code remains the same
      setLoading(false);
    }
  };

  const refreshData = async () => {
    try {
      setLoading(true);
      await axios.post("/refresh-data");
      await fetchTopCoins();
      setAnalysis(""); // Clear previous analysis
      setLoading(false);
    } catch (err) {
      // Error handling code remains the same
    }
  };

  const analyzeCoins = async (question) => {
    try {
      setLoading(true);
      console.log("Sending analysis request:", question);
      const response = await axios.post("/analyze", {
        question,
        use_dynamic_weights: true,
        top_n: 10,
      });

      console.log("Analysis response:", response.data);
      setMarketCondition(response.data.market_condition);
      setWeights(response.data.weights);
      setTopCoins(response.data.top_coins);
      setAnalysis(response.data.analysis);
      setLoading(false);
    } catch (err) {
      console.error("Error analyzing data:", err);
      if (err.response) {
        console.error("Response status:", err.response.status);
        console.error("Response data:", err.response.data);
        setError(
          `Analysis failed: ${err.response.status} - ${JSON.stringify(
            err.response.data
          )}`
        );
      } else if (err.request) {
        setError(
          "No response from server. Please check if the API is running."
        );
      } else {
        setError(`Error: ${err.message}`);
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Top coins and market info */}
          <div className="lg:col-span-1">
            <button
              onClick={refreshData}
              className="mb-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition duration-200 flex items-center"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                "Refresh Data"
              )}
            </button>
            <TopCoins coins={topCoins} loading={loading} />
            {marketCondition && weights && (
              <MarketInfo marketCondition={marketCondition} weights={weights} />
            )}
          </div>

          {/* Right column - Chat and analysis */}
          <div className="lg:col-span-2">
            <ChatInterface onSubmit={analyzeCoins} loading={loading} />
            {analysis && <AnalysisDisplay analysis={analysis} />}
            {error && (
              <div className="mt-4 p-4 bg-red-900/30 border border-red-700 rounded-lg">
                <h3 className="text-red-400 font-medium mb-2">Error</h3>
                <p className="text-sm text-red-300">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-2 px-3 py-1 bg-red-800/50 hover:bg-red-800 text-red-200 text-xs rounded"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
