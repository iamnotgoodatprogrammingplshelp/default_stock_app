import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

export default function CurrencyCard({ pair, price, change, changePercent, spread }) {
  const isPositive = change >= 0;

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{pair}</h3>
        <div className={`flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? (
            <ArrowUpIcon className="h-4 w-4" />
          ) : (
            <ArrowDownIcon className="h-4 w-4" />
          )}
        </div>
      </div>
      <p className="text-2xl font-bold mt-2">{price.toFixed(4)}</p>
      <div className="flex justify-between mt-2 text-sm">
        <div className={`${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {change.toFixed(4)} ({changePercent.toFixed(2)}%)
        </div>
        <div className="text-gray-400">
          Spread: {spread.toFixed(4)}
        </div>
      </div>
    </div>
  );
}