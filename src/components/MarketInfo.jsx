function MarketInfo({ marketCondition, weights }) {
  // Function to get market condition description
  const getMarketDescription = (condition) => {
    switch (condition.toLowerCase()) {
      case "volatile":
        return "Markets showing high variability with significant price swings.";
      case "trending":
        return "Markets showing consistent directional movement.";
      case "stable":
        return "Markets showing balanced, less dramatic price action.";
      default:
        return "Market condition unavailable.";
    }
  };

  // Function to get badge color based on market condition
  const getMarketBadgeColor = (condition) => {
    switch (condition.toLowerCase()) {
      case "volatile":
        return "bg-amber-800/30 text-amber-400 border-amber-800";
      case "trending":
        return "bg-green-800/30 text-green-400 border-green-800";
      case "stable":
        return "bg-blue-800/30 text-blue-400 border-blue-800";
      default:
        return "bg-zinc-800/30 text-zinc-400 border-zinc-800";
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Market Condition</h2>

      <div className="mb-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium border ${getMarketBadgeColor(
            marketCondition
          )}`}
        >
          {marketCondition.toUpperCase()}
        </span>
        <p className="mt-2 text-sm text-zinc-400">
          {getMarketDescription(marketCondition)}
        </p>
      </div>

      <h3 className="text-md font-semibold mb-2">Timeframe Weights</h3>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(weights).map(([timeframe, weight]) => (
          <div
            key={timeframe}
            className="bg-zinc-800 rounded p-2 flex justify-between items-center"
          >
            <span className="text-sm font-medium">
              {timeframe.toUpperCase()}
            </span>
            <span className="text-sm font-mono bg-zinc-700 px-2 py-1 rounded">
              {(weight * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block text-zinc-400">
              Weight Distribution
            </span>
          </div>
        </div>
        <div className="flex h-2 overflow-hidden rounded bg-zinc-800">
          {Object.entries(weights).map(([timeframe, weight], index) => {
            // Different color for each timeframe
            const colors = [
              "bg-red-500",
              "bg-amber-500",
              "bg-green-500",
              "bg-blue-500",
            ];
            const width = `${weight * 100}%`;

            return (
              <div
                key={timeframe}
                style={{ width }}
                className={`${colors[index % colors.length]}`}
              ></div>
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-zinc-500 mt-1">
          {Object.keys(weights).map((timeframe) => (
            <span key={timeframe}>{timeframe}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MarketInfo;
