function TopCoins({ coins, loading }) {
  // Helper function to conditionally style values
  const getValueColor = (value) => {
    if (value > 0) return "text-green-400";
    if (value < 0) return "text-red-400";
    return "text-zinc-400";
  };

  // Debug log
  console.log("TopCoins component received:", {
    coins,
    loading,
    coinsLength: coins?.length,
  });

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-6">
      <h2 className="text-xl font-bold mb-4">Top Memecoins</h2>
      {loading ? (
        <div className="flex justify-center py-8">
          <svg
            className="animate-spin h-8 w-8 text-white"
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
        </div>
      ) : coins && coins.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-800">
            <thead>
              <tr>
                <th className="px-2 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Coin
                </th>
                <th className="px-2 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {coins.map((coin, index) => (
                <tr
                  key={coin.coin}
                  className="hover:bg-zinc-800/50 transition duration-150"
                >
                  <td className="px-2 py-3 whitespace-nowrap text-sm">
                    {index + 1}
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap text-sm font-medium">
                    {coin.coin}
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap text-sm text-right font-mono">
                    <span className="font-semibold">
                      {coin.weighted_rs.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-8 text-center text-zinc-500">
          No coin data available. Try refreshing the data.
        </div>
      )}

      {coins && coins.length > 0 && (
        <div className="mt-4">
          <div className="text-xs text-zinc-500 mb-2">Detailed Data</div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-800 text-xs">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-left text-zinc-400">Coin</th>
                  <th className="px-2 py-2 text-right text-zinc-400">90d</th>
                  <th className="px-2 py-2 text-right text-zinc-400">30d</th>
                  <th className="px-2 py-2 text-right text-zinc-400">7d</th>
                  <th className="px-2 py-2 text-right text-zinc-400">24h</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {coins.map((coin) => (
                  <tr
                    key={`detail-${coin.coin}`}
                    className="hover:bg-zinc-800/50 transition duration-150"
                  >
                    <td className="px-2 py-2 whitespace-nowrap font-medium">
                      {coin.coin}
                    </td>
                    <td
                      className={`px-2 py-2 whitespace-nowrap text-right ${getValueColor(
                        coin.rs_90d
                      )}`}
                    >
                      {coin.rs_90d.toFixed(2)}
                    </td>
                    <td
                      className={`px-2 py-2 whitespace-nowrap text-right ${getValueColor(
                        coin.rs_30d
                      )}`}
                    >
                      {coin.rs_30d.toFixed(2)}
                    </td>
                    <td
                      className={`px-2 py-2 whitespace-nowrap text-right ${getValueColor(
                        coin.rs_7d
                      )}`}
                    >
                      {coin.rs_7d.toFixed(2)}
                    </td>
                    <td
                      className={`px-2 py-2 whitespace-nowrap text-right ${getValueColor(
                        coin.rs_24h
                      )}`}
                    >
                      {coin.rs_24h.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopCoins;
