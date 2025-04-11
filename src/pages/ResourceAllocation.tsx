import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const ResourceAllocation: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const resources = [
    {
      name: 'ICU Beds',
      department: 'All',
      current: 18,
      forecast: 22,
      capacity: 25,
      utilization: 88
    },
    {
      name: 'General Beds',
      department: 'All',
      current: 120,
      forecast: 135,
      capacity: 150,
      utilization: 90
    },
    {
      name: 'Ventilators',
      department: 'All',
      current: 12,
      forecast: 15,
      capacity: 20,
      utilization: 72
    },
    {
      name: 'Staff',
      department: 'All',
      current: 45,
      forecast: 52,
      capacity: 55,
      utilization: 82
    },
    {
      name: 'Operating Rooms',
      department: 'All',
      current: 6,
      forecast: 8,
      capacity: 10,
      utilization: 80
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold mb-4">Hospital resource forecasting and optimization</h1>
        
        <nav className="flex space-x-4 mb-6">
          <button
            onClick={() => navigate('/overview')}
            className={`px-4 py-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            Overview
          </button>
          <button
            onClick={() => navigate('/patients')}
            className={`px-4 py-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            Patients
          </button>
          <button
            onClick={() => navigate('/resources')}
            className={`px-4 py-2 rounded-lg bg-gray-700 text-white`}
          >
            Resources
          </button>
          <button
            onClick={() => navigate('/staff')}
            className={`px-4 py-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            Staff
          </button>
        </nav>

        <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Resource Allocation</h2>
              <p className="text-sm text-gray-500">Detailed view of all hospital resources</p>
            </div>
            <button className="text-gray-500 hover:text-gray-400 flex items-center">
              <span>Export Report</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="py-3 px-4 text-gray-400">Resource</th>
                  <th className="py-3 px-4 text-gray-400">Department</th>
                  <th className="py-3 px-4 text-gray-400">Current</th>
                  <th className="py-3 px-4 text-gray-400">Forecast</th>
                  <th className="py-3 px-4 text-gray-400">Capacity</th>
                  <th className="py-3 px-4 text-gray-400">Utilization</th>
                </tr>
              </thead>
              <tbody>
                {resources.map((resource, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-4 px-4 font-medium">{resource.name}</td>
                    <td className="py-4 px-4">{resource.department}</td>
                    <td className="py-4 px-4">{resource.current}</td>
                    <td className="py-4 px-4">{resource.forecast}</td>
                    <td className="py-4 px-4">{resource.capacity}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-16 h-2 bg-gray-700 rounded mr-2">
                          <div 
                            className={`h-full rounded ${
                              resource.utilization >= 90 ? 'bg-red-500' :
                              resource.utilization >= 80 ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${resource.utilization}%` }}
                          />
                        </div>
                        <span>{resource.utilization}%</span>
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
  );
};

export default ResourceAllocation;