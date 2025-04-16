import React from 'react';

interface Resource {
  name: string;
  department: string;
  current: number;
  forecast: number;
  capacity: number;
  utilization: number;
}

const resources: Resource[] = [
  { name: 'ICU Beds', department: 'All', current: 18, forecast: 22, capacity: 25, utilization: 88 },
  { name: 'General Beds', department: 'All', current: 120, forecast: 135, capacity: 150, utilization: 80 },
  { name: 'Ventilators', department: 'All', current: 12, forecast: 15, capacity: 20, utilization: 72 },
  { name: 'Staff', department: 'All', current: 45, forecast: 52, capacity: 55, utilization: 82 },
  { name: 'Operating Rooms', department: 'All', current: 6, forecast: 8, capacity: 10, utilization: 60 }
];

const ResourceAllocation: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Resource Allocation</h1>
          <p className="text-gray-400">Detailed view of all hospital resources</p>
        </div>
        <button className="px-4 py-2 text-gray-400 hover:text-white flex items-center gap-2">
          Export Report
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-4 text-gray-400">Resource</th>
              <th className="text-left p-4 text-gray-400">Department</th>
              <th className="text-left p-4 text-gray-400">Current</th>
              <th className="text-left p-4 text-gray-400">Forecast</th>
              <th className="text-left p-4 text-gray-400">Capacity</th>
              <th className="text-left p-4 text-gray-400">Utilization</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr key={resource.name} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                <td className="p-4 text-white font-medium">{resource.name}</td>
                <td className="p-4 text-gray-300">{resource.department}</td>
                <td className="p-4 text-gray-300">{resource.current}</td>
                <td className="p-4 text-gray-300">{resource.forecast}</td>
                <td className="p-4 text-gray-300">{resource.capacity}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          resource.utilization > 90 ? 'bg-red-500' :
                          resource.utilization > 75 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${resource.utilization}%` }}
                      />
                    </div>
                    <span className="text-gray-300">{resource.utilization}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResourceAllocation;