import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ForexChart({ data }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg h-[500px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">EUR/USD</h3>
        <div className="flex gap-4">
          <button className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700">1H</button>
          <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">4H</button>
          <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">1D</button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" domain={['auto', 'auto']} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
            labelStyle={{ color: '#9CA3AF' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="ma20" 
            stroke="#10B981" 
            strokeWidth={1}
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="ma50" 
            stroke="#F59E0B" 
            strokeWidth={1}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}