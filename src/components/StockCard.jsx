import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

export default function StockCard({ symbol, price, change, changePercent }) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{symbol}</h3>
        <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? (
            <ArrowUpIcon className="h-4 w-4" />
          ) : (
            <ArrowDownIcon className="h-4 w-4" />
          )}
        </div>
      </div>
      <p className="text-2xl font-bold mt-2">${price.toFixed(2)}</p>
      <div className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {change.toFixed(2)} ({changePercent.toFixed(2)}%)
      </div>
    </div>
  );
}