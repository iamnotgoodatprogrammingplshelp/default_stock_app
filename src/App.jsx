import { useState } from 'react';
import CurrencyCard from './components/CurrencyCard';
import ForexChart from './components/ForexChart';
import TradingPositions from './components/TradingPositions';

// Mock data for demonstration
const mockCurrencyPairs = [
  { pair: 'EUR/USD', price: 1.0842, change: 0.0023, changePercent: 0.21, spread: 0.0002 },
  { pair: 'GBP/USD', price: 1.2632, change: -0.0015, changePercent: -0.12, spread: 0.0003 },
  { pair: 'USD/JPY', price: 150.24, change: 0.32, changePercent: 0.21, spread: 0.02 },
  { pair: 'AUD/USD', price: 0.6524, change: -0.0018, changePercent: -0.28, spread: 0.0003 },
];

const mockChartData = Array.from({ length: 48 }, (_, i) => ({
  time: `${i}:00`,
  price: 1.0800 + Math.random() * 0.01,
  ma20: 1.0850,
  ma50: 1.0830,
}));

const mockPositions = [
  { id: 1, pair: 'EUR/USD', type: 'BUY', openPrice: 1.0820, currentPrice: 1.0842, profit: 220, volume: 1.0 },
  { id: 2, pair: 'GBP/USD', type: 'SELL', openPrice: 1.2650, currentPrice: 1.2632, profit: 180, volume: 0.5 },
];

function App() {
  const [positions, setPositions] = useState(mockPositions);

  const closePosition = (id) => {
    setPositions(positions.filter(position => position.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Forex Trading Dashboard</h1>
          <div className="bg-gray-800 px-4 py-2 rounded-lg">
            <span className="text-gray-400">Balance:</span>
            <span className="ml-2 font-bold">$10,000.00</span>
          </div>
        </div>
        
        {/* Currency Pairs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {mockCurrencyPairs.map((currency) => (
            <CurrencyCard key={currency.pair} {...currency} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <ForexChart data={mockChartData} />
          </div>

          {/* Trading Positions Section */}
          <div>
            <TradingPositions positions={positions} onClose={closePosition} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;