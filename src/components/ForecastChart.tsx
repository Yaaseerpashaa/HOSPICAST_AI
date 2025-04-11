import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '../hooks/useTheme';

interface ForecastData {
  date: string;
  actual: number;
  predicted: number;
}

interface ForecastChartProps {
  data: ForecastData[];
}

const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">7-Day Admission Forecast</h3>
        <div className="flex gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Actual</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Predicted</span>
          </div>
        </div>
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#4B5563" : "#E5E7EB"} opacity={0.2} />
            <XAxis
              dataKey="date"
              stroke={isDark ? "#D1D5DB" : "#4B5563"}
              tick={{ fill: isDark ? "#D1D5DB" : "#4B5563" }}
              tickLine={{ stroke: isDark ? "#D1D5DB" : "#4B5563" }}
              tickMargin={10}
            />
            <YAxis
              stroke={isDark ? "#D1D5DB" : "#4B5563"}
              tick={{ fill: isDark ? "#D1D5DB" : "#4B5563" }}
              tickLine={{ stroke: isDark ? "#D1D5DB" : "#4B5563" }}
              tickMargin={10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                border: `1px solid ${isDark ? '#4B5563' : '#E5E7EB'}`,
                borderRadius: '8px',
                color: isDark ? '#F3F4F6' : '#1F2937',
                backdropFilter: 'blur(4px)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              labelStyle={{
                color: isDark ? '#F3F4F6' : '#1F2937',
                fontWeight: 'bold',
                marginBottom: '4px'
              }}
            />
            <Line
              type="monotone"
              dataKey="actual"
              name="Actual Admissions"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: "#2563EB", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 8, fill: "#2563EB" }}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              name="Predicted Admissions"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ fill: "#059669", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 8, fill: "#059669" }}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForecastChart;