import React from 'react';
import BackgroundPattern from '../components/BackgroundPattern';
import { useTheme } from '../hooks/useTheme';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';

const admissionsData = [
  { day: 'Mon', actual: 35, forecast: 32 },
  { day: 'Tue', actual: 38, forecast: 35 },
  { day: 'Wed', actual: 45, forecast: 42 },
  { day: 'Thu', actual: 40, forecast: 45 },
  { day: 'Fri', actual: 48, forecast: 44 },
  { day: 'Sat', actual: 35, forecast: 38 },
  { day: 'Sun', actual: 32, forecast: 30 },
];

const monthlyForecastData = [
  { month: 'Jan', general: 420, icu: 85, emergency: 310 },
  { month: 'Feb', general: 450, icu: 90, emergency: 290 },
  { month: 'Mar', general: 470, icu: 95, emergency: 300 },
  { month: 'Apr', general: 490, icu: 100, emergency: 320 },
  { month: 'May', general: 520, icu: 110, emergency: 340 },
  { month: 'Jun', general: 550, icu: 115, emergency: 360 },
];

const ForecastsPage: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      <BackgroundPattern variant="dashboard" />
      
      <div className="relative z-10 p-3 md:p-4">
        <div className="max-w-7xl mx-auto">
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admission Forecasts
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              Interactive analytics for predicting hospital admissions and resource requirements
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Admissions Chart */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 md:p-5 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">7-Day Admissions Forecast</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Projected vs actual admissions for the current week</p>
                </div>
              </div>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={admissionsData}
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#4B5563" : "#E5E7EB"} opacity={0.2} />
                    <XAxis 
                      dataKey="day" 
                      stroke={isDark ? "#D1D5DB" : "#4B5563"}
                      tick={{ fill: isDark ? "#D1D5DB" : "#4B5563" }}
                    />
                    <YAxis 
                      stroke={isDark ? "#D1D5DB" : "#4B5563"}
                      tick={{ fill: isDark ? "#D1D5DB" : "#4B5563" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                        border: `1px solid ${isDark ? '#4B5563' : '#E5E7EB'}`,
                        borderRadius: '8px',
                        color: isDark ? '#F3F4F6' : '#1F2937',
                      }}
                    />
                    <Legend />
                    <Bar 
                      name="Actual Admissions" 
                      dataKey="actual" 
                      fill="#3B82F6" 
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      name="Forecasted Admissions" 
                      dataKey="forecast" 
                      fill="#10B981" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Forecast */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 md:p-5 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">6-Month Admissions Trend</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Long-term forecasts by department</p>
                </div>
              </div>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyForecastData}
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#4B5563" : "#E5E7EB"} opacity={0.2} />
                    <XAxis 
                      dataKey="month" 
                      stroke={isDark ? "#D1D5DB" : "#4B5563"}
                      tick={{ fill: isDark ? "#D1D5DB" : "#4B5563" }}
                    />
                    <YAxis 
                      stroke={isDark ? "#D1D5DB" : "#4B5563"}
                      tick={{ fill: isDark ? "#D1D5DB" : "#4B5563" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                        border: `1px solid ${isDark ? '#4B5563' : '#E5E7EB'}`,
                        borderRadius: '8px',
                        color: isDark ? '#F3F4F6' : '#1F2937',
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      name="General Ward" 
                      dataKey="general" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      name="ICU" 
                      dataKey="icu" 
                      stroke="#EF4444" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      name="Emergency" 
                      dataKey="emergency" 
                      stroke="#F59E0B" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* AI-based forecast explanation */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 md:p-5 shadow-lg border border-gray-100 dark:border-gray-700 mt-6">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
              How Our AI Forecast Works
            </h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                HospiCast uses advanced machine learning algorithms to predict patient admissions based on:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Historical admission patterns</li>
                <li>Seasonal disease trends</li>
                <li>Local population demographics</li>
                <li>Current hospital occupancy rate</li>
                <li>Staffing levels and availability</li>
              </ul>
              <p>
                Our forecasting model is updated daily and achieves 89% accuracy for 7-day forecasts and 75% accuracy for monthly projections.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastsPage; 