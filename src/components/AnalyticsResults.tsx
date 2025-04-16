import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend // Add Legend import
} from 'recharts';

// Add COLORS constant
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface AnalyticsResultsProps {
  results: any;
  isDark: boolean;
  chartType: 'bar' | 'line' | 'pie' | 'donut';
}

export const AnalyticsResults: React.FC<AnalyticsResultsProps> = ({ results, isDark, chartType }) => {
  const formatChartData = (data: any, type: string) => {
    switch (type) {
      case 'forecast':
        return results.patientFlow.admissions.map((value: number, index: number) => ({
          name: `Day ${index + 1}`,
          Admissions: value,
          Discharges: results.patientFlow.discharges[index],
          Transfers: results.patientFlow.transfers[index]
        }));
      case 'department':
        return Object.entries(results.departmentMetrics).map(([dept, metrics]: [string, any]) => ({
          name: dept,
          Patients: metrics.patientCount,
          Utilization: metrics.resourceUtilization * 100
        }));
      default:
        return data;
    }
  };

  const renderChart = (data: any, type: string) => {
    const formattedData = formatChartData(data, type);
    
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {type === 'forecast' ? (
              <>
                <Line type="monotone" dataKey="Admissions" stroke="#8884d8" />
                <Line type="monotone" dataKey="Discharges" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Transfers" stroke="#ffc658" />
              </>
            ) : (
              <>
                <Line type="monotone" dataKey="Patients" stroke="#8884d8" />
                <Line type="monotone" dataKey="Utilization" stroke="#82ca9d" />
              </>
            )}
          </LineChart>
        );
      case 'pie':
      case 'donut':
        return (
          <PieChart>
            <Pie
              data={formattedData}
              dataKey={type === 'forecast' ? "Admissions" : "Patients"}
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={chartType === 'donut' ? 60 : 0}
              outerRadius={80}
              label
            >
              {formattedData.map((_: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      default:
        return (
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {type === 'forecast' ? (
              <>
                <Bar dataKey="Admissions" fill="#8884d8" />
                <Bar dataKey="Discharges" fill="#82ca9d" />
                <Bar dataKey="Transfers" fill="#ffc658" />
              </>
            ) : (
              <>
                <Bar dataKey="Patients" fill="#8884d8" />
                <Bar dataKey="Utilization" fill="#82ca9d" />
              </>
            )}
          </BarChart>
        );
    }
  };

  return (
    <div className={`mt-6 grid grid-cols-2 gap-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
      {/* KPIs section remains the same */}

      {/* Forecast Chart */}
      <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className="text-lg font-semibold mb-4">Forecast Analysis</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart(null, 'forecast')}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Chart */}
      <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className="text-lg font-semibold mb-4">Department Analysis</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart(null, 'department')}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};