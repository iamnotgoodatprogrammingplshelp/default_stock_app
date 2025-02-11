import { useState, useEffect } from 'react';
import axios from 'axios';
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

const mockPositions = [
  { id: 1, pair: 'EUR/USD', type: 'BUY', openPrice: 1.0820, currentPrice: 1.0842, profit: 220, volume: 1.0 },
  { id: 2, pair: 'GBP/USD', type: 'SELL', openPrice: 1.2650, currentPrice: 1.2632, profit: 180, volume: 0.5 },
];

const API_BASE_URL = 'http://localhost:8000';

function App() {
  const [positions, setPositions] = useState(mockPositions);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check server health first
        const healthCheck = await axios.get(`${API_BASE_URL}/health`);
        if (healthCheck.data.status !== 'healthy') {
          throw new Error('Server is not healthy');
        }

        const response = await axios.get(`${API_BASE_URL}/api/forex`);
        setChartData(response.data);
        setLoading(false);
        setRetryCount(0); // Reset retry count on successful fetch
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);

        // Implement exponential backoff for retries
        if (retryCount < 3) {
          const backoffDelay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, backoffDelay);
        }
      }
    };

    fetchData();

    // Fetch new data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [retryCount]);

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
            {loading ? (
              <div className="bg-gray-800 p-4 rounded-lg h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <p className="mb-2">Loading chart data...</p>
                  {retryCount > 0 && (
                    <p className="text-sm text-gray-400">
                      Retry attempt {retryCount} of 3...
                    </p>
                  )}
                </div>
              </div>
            ) : error ? (
              <div className="bg-gray-800 p-4 rounded-lg h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-red-400 mb-2">Error: {error}</p>
                  {retryCount < 3 && (
                    <p className="text-sm text-gray-400">
                      Retrying automatically...
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <ForexChart data={chartData} />
            )}
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