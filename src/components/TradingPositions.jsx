export default function TradingPositions({ positions, onClose }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Open Positions</h3>
      <div className="space-y-3">
        {positions.map((position) => (
          <div key={position.id} className="bg-gray-700 p-3 rounded">
            <div className="flex justify-between items-center">
              <span className="font-medium">{position.pair}</span>
              <span className={`px-2 py-1 rounded text-sm ${
                position.type === 'BUY' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
              }`}>
                {position.type}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-400">Open:</span>
                <span className="ml-2">{position.openPrice}</span>
              </div>
              <div>
                <span className="text-gray-400">Current:</span>
                <span className="ml-2">{position.currentPrice}</span>
              </div>
              <div>
                <span className="text-gray-400">Volume:</span>
                <span className="ml-2">{position.volume}</span>
              </div>
              <div>
                <span className="text-gray-400">P/L:</span>
                <span className={`ml-2 ${position.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${position.profit}
                </span>
              </div>
            </div>
            <button
              onClick={() => onClose(position.id)}
              className="w-full mt-2 py-1 bg-gray-600 hover:bg-gray-500 rounded text-sm"
            >
              Close Position
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}