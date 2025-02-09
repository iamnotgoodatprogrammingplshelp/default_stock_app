export default function WatchList({ stocks, onRemove }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Watchlist</h3>
      <div className="space-y-2">
        {stocks.map((stock) => (
          <div key={stock.symbol} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
            <div>
              <span className="font-medium">{stock.symbol}</span>
              <span className="ml-2 text-gray-500">${stock.price.toFixed(2)}</span>
            </div>
            <button
              onClick={() => onRemove(stock.symbol)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}