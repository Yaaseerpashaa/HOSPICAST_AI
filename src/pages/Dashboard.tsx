import React, { useState } from 'react';
import { 
  ArrowRight, 
  Users, 
  Bed, 
  Activity 
} from 'lucide-react';
import BackgroundPattern from '../components/BackgroundPattern';
import { useTheme } from '../hooks/useTheme';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
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

const resourceData = [
  { resource: 'ICU Beds', current: 18, forecast: 22, capacity: 25, usage: 72 },
  { resource: 'General Beds', current: 120, forecast: 135, capacity: 150, usage: 80 },
  { resource: 'Ventilators', current: 12, forecast: 15, capacity: 20, usage: 60 },
  { resource: 'Staff', current: 45, forecast: 52, capacity: 55, usage: 82 },
  { resource: 'Operating Rooms', current: 6, forecast: 8, capacity: 10, usage: 60 },
];

const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      <BackgroundPattern variant="dashboard" />
      
      <div className="relative z-10 p-3 md:p-4">
        <div className="max-w-7xl mx-auto">
          <header className="mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              HospiCast AI
            </h1>
            <div className="flex overflow-x-auto scrollbar-hide gap-2 md:gap-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              <button className="px-3 py-1 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500 font-medium whitespace-nowrap">
                Overview
              </button>
              <button className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium whitespace-nowrap">
                Patients
              </button>
              <button className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium whitespace-nowrap">
                Resources
              </button>
              <button className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium whitespace-nowrap">
                Staff
              </button>
            </div>
          </header>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4">
            {/* Forecasted Admissions */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg border border-gray-100 dark:border-gray-700 relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <ArrowRight className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">Forecasted Admissions</h3>
              <div className="flex items-end gap-2">
                <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">42</span>
                <span className="text-xs text-green-600 dark:text-green-400 mb-1">+11% from yesterday</span>
              </div>
            </div>

            {/* ICU Beds Required */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg border border-gray-100 dark:border-gray-700 relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <Bed className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">ICU Beds Required</h3>
              <div className="flex items-end gap-2">
                <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">22</span>
                <span className="text-xs text-gray-600 dark:text-gray-400 mb-1">18/25 currently in use</span>
              </div>
            </div>

            {/* Staff Needed */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg border border-gray-100 dark:border-gray-700 relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <Users className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">Staff Needed</h3>
              <div className="flex items-end gap-2">
                <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">52</span>
                <span className="text-xs text-gray-600 dark:text-gray-400 mb-1">45 currently on-shift</span>
              </div>
            </div>

            {/* Average Length of Stay */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg border border-gray-100 dark:border-gray-700 relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <Activity className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">Avg. Length of Stay</h3>
              <div className="flex items-end gap-2">
                <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">4.2</span>
                <span className="text-2xl md:text-3xl font-bold text-gray-400 dark:text-gray-500">days</span>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Based on current patient mix</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            {/* Chart */}
            <div className="lg:col-span-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">7-Day Admissions Forecast</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Projected patient admissions for the next week</p>
                </div>
              </div>
              
              <div className="h-[250px] md:h-[300px]">
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
              
              <div className="flex justify-center mt-2 gap-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Actual Admissions</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-sm mr-2"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Forecasted Admissions</span>
                </div>
              </div>
            </div>

            {/* Resource Utilization */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="mb-3">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">Resource Utilization</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Current and forecasted resource usage</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left text-xs font-medium uppercase tracking-wider py-2 text-gray-700 dark:text-gray-300">Resource</th>
                      <th className="text-center text-xs font-medium uppercase tracking-wider py-2 text-gray-700 dark:text-gray-300">Current</th>
                      <th className="text-center text-xs font-medium uppercase tracking-wider py-2 text-gray-700 dark:text-gray-300">Forecast</th>
                      <th className="text-center text-xs font-medium uppercase tracking-wider py-2 text-gray-700 dark:text-gray-300">Capacity</th>
                      <th className="text-center text-xs font-medium uppercase tracking-wider py-2 text-gray-700 dark:text-gray-300">Util%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resourceData.map((item, index) => (
                      <tr key={index} className={index < resourceData.length - 1 ? "border-b border-gray-200 dark:border-gray-700" : ""}>
                        <td className="py-2 text-sm font-medium text-gray-900 dark:text-white">{item.resource}</td>
                        <td className="py-2 text-sm text-center text-gray-700 dark:text-gray-300">{item.current}</td>
                        <td className="py-2 text-sm text-center text-gray-700 dark:text-gray-300">{item.forecast}</td>
                        <td className="py-2 text-sm text-center text-gray-700 dark:text-gray-300">{item.capacity}</td>
                        <td className="py-2">
                          <div className="flex items-center justify-center">
                            <div className="w-16 md:w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  item.usage >= 80 ? 'bg-red-500' : 
                                  item.usage >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                                }`} 
                                style={{ width: `${item.usage}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 