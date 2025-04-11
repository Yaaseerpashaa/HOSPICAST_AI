import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const metrics = {
    forecasted_admissions: { value: 42, change: '+11% from yesterday' },
    icu_beds: { value: 22, detail: '18/25 currently in use' },
    staff_needed: { value: 52, detail: '45 currently on-shift' },
    avg_los: { value: 4.2, unit: 'days' }
  };

  const admissionsData = {
    actual: [35, 38, 45, 40, 48, 35, 32],
    forecast: [32, 35, 42, 45, 43, 38, 30],
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };

  const resources = [
    { name: 'ICU Beds', current: 18, forecast: 22, capacity: 25 },
    { name: 'General Beds', current: 120, forecast: 135, capacity: 150 },
    { name: 'Ventilators', current: 12, forecast: 15, capacity: 20 },
    { name: 'Staff', current: 45, forecast: 52, capacity: 55 },
    { name: 'Operating Rooms', current: 6, forecast: 8, capacity: 10 }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">HospiCast AI</h1>
          <nav className="flex space-x-4">
            <button
              onClick={() => navigate('/overview')}
              className={`px-4 py-2 rounded-lg ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
            >
              Overview
            </button>
            <button
              onClick={() => navigate('/patients')}
              className={`px-4 py-2 rounded-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Patients
            </button>
            <button
              onClick={() => navigate('/resources')}
              className={`px-4 py-2 rounded-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Resources
            </button>
            <button
              onClick={() => navigate('/staff')}
              className={`px-4 py-2 rounded-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Staff
            </button>
          </nav>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-sm text-gray-500">Forecasted Admissions</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{metrics.forecasted_admissions.value}</span>
              <span className="ml-2 text-xs text-green-500">{metrics.forecasted_admissions.change}</span>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-sm text-gray-500">ICU Beds Required</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{metrics.icu_beds.value}</span>
              <span className="ml-2 text-xs text-gray-500">{metrics.icu_beds.detail}</span>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-sm text-gray-500">Staff Needed</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{metrics.staff_needed.value}</span>
              <span className="ml-2 text-xs text-gray-500">{metrics.staff_needed.detail}</span>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-sm text-gray-500">Avg. Length of Stay</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{metrics.avg_los.value}</span>
              <span className="ml-2 text-xs text-gray-500">{metrics.avg_los.unit}</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-4 gap-4">
          {/* 7-Day Admissions Forecast */}
          <div className={`col-span-3 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-lg font-semibold mb-2">7-Day Admissions Forecast</h3>
            <p className="text-sm text-gray-500 mb-4">Projected patient admissions for the next week</p>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={admissionsData.days.map((day, index) => ({
                    day,
                    actual: admissionsData.actual[index],
                    forecast: admissionsData.forecast[index]
                  }))}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1F2937' : '#E5E7EB'} />
                  <XAxis 
                    dataKey="day" 
                    stroke={isDark ? '#9CA3AF' : '#6B7280'}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke={isDark ? '#9CA3AF' : '#6B7280'}
                    domain={[0, 60]}
                    ticks={[0, 15, 30, 45, 60]}
                    tickLine={false}
                  />
                  <Bar 
                    name="Actual Admissions"
                    dataKey="actual" 
                    fill="#2563EB" // Deep blue for actual
                    radius={[4, 4, 0, 0]}
                    opacity={0.9}
                  />
                  <Bar 
                    name="Forecasted Admissions"
                    dataKey="forecast" 
                    fill="#10B981" // Rich green for forecast
                    radius={[4, 4, 0, 0]}
                    opacity={0.9}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Resource Utilization */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-lg font-semibold mb-2">Resource Utilization</h3>
            <p className="text-sm text-gray-500 mb-4">Current and forecasted resource usage</p>
            <div className="space-y-4">
              {resources.map((resource, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{resource.name}</span>
                    <div className="text-right">
                      <span className="mr-2">{resource.current}</span>
                      <span className="text-cyan-400">{resource.forecast}</span>
                      <span className="ml-2">{resource.capacity}</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded">
                    <div
                      className={`h-full rounded ${
                        (resource.current / resource.capacity) * 100 > 90 
                          ? 'bg-red-500' 
                          : (resource.current / resource.capacity) * 100 > 75
                          ? 'bg-yellow-500'
                          : 'bg-cyan-400'
                      }`}
                      style={{ width: `${(resource.current / resource.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;