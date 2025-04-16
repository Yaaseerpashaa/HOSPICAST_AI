import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { useTheme } from "../hooks/useTheme";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  Scatter,
  ScatterChart,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
} from "recharts";
import { toast } from "react-hot-toast";
import { exportToPDF } from "../utils/exportUtils";
import { HospitalPredictionService } from "../services/predictionService";
import { hospitalDatasets } from "../utils/hospitalDatasets";
import { AnalyticsButton } from "../components/AnalyticsButton";
import { AnalyticsResults } from "../components/AnalyticsResults";

interface DashboardMetrics {
  forecasted_admissions: { value: number; change: string };
  icu_beds: { value: number; detail: string };
  staff_needed: { value: number; detail: string };
  avg_los: { value: number; unit: string };
}

type ChartType =
  | "bar"
  | "line"
  | "pie"
  | "donut"
  | "area"
  | "scatter"
  | "radar"
  | "composed";

// Props interface for the dashboard content component
interface DashboardContentWithChartProps {
  chartType: ChartType;
  metrics: DashboardMetrics;
}

// Enhanced Dashboard Content component with chart type selection
const DashboardContentWithChart: React.FC<DashboardContentWithChartProps> = ({
  chartType: ChartType,
  metrics,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Add this state in DashboardContentWithChart
  const [forecastChartType, setForecastChartType] = useState<ChartType>("bar");

  // Add this function in DashboardContentWithChart
  const cycleForecastChartType = () => {
    const types: ChartType[] = [
      "bar",
      "line",
      "pie",
      "donut",
      "area",
      "scatter",
      "radar",
      "composed",
    ];
    const currentIndex = types.indexOf(forecastChartType);
    setForecastChartType(types[(currentIndex + 1) % types.length]);
  };

  const admissionsData = {
    actual: [35, 38, 45, 40, 48, 35, 32],
    forecast: [32, 35, 42, 45, 43, 38, 30],
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  };

  const resources = [
    { name: "ICU Beds", current: 18, forecast: 22, capacity: 25 },
    { name: "General Beds", current: 120, forecast: 135, capacity: 150 },
    { name: "Ventilators", current: 12, forecast: 15, capacity: 20 },
    { name: "Staff", current: 45, forecast: 52, capacity: 55 },
    { name: "Operating Rooms", current: 6, forecast: 8, capacity: 10 },
  ];

  // Function to render different chart types based on the selected chart type
  const renderForecastChart = (chartType: ChartType) => {
    // Prepare data in a format usable by all chart types
    const chartData = admissionsData.days.map((day, index) => ({
      day,
      actual: admissionsData.actual[index],
      forecast: admissionsData.forecast[index],
    }));

    switch (chartType) {
      case "area":
        return (
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#1F2937" : "#E5E7EB"}
            />
            <XAxis dataKey="day" stroke={isDark ? "#9CA3AF" : "#6B7280"} />
            <YAxis stroke={isDark ? "#9CA3AF" : "#6B7280"} />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="actual"
              fill="#2563EB"
              stroke="#2563EB"
            />
            <Area
              type="monotone"
              dataKey="forecast"
              fill="#10B981"
              stroke="#10B981"
            />
          </AreaChart>
        );
      case "scatter":
        return (
          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#1F2937" : "#E5E7EB"}
            />
            <XAxis dataKey="day" stroke={isDark ? "#9CA3AF" : "#6B7280"} />
            <YAxis stroke={isDark ? "#9CA3AF" : "#6B7280"} />
            <Tooltip />
            <Legend />
            <Scatter name="Actual" data={chartData} fill="#2563EB" />
            <Scatter name="Forecast" data={chartData} fill="#10B981" />
          </ScatterChart>
        );
      case "radar":
        return (
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid stroke={isDark ? "#1F2937" : "#E5E7EB"} />
            <PolarAngleAxis dataKey="day" />
            <PolarRadiusAxis />
            <Radar
              name="Actual"
              dataKey="actual"
              stroke="#2563EB"
              fill="#2563EB"
              fillOpacity={0.6}
            />
            <Radar
              name="Forecast"
              dataKey="forecast"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        );
      case "composed":
        return (
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid stroke={isDark ? "#1F2937" : "#E5E7EB"} />
            <XAxis dataKey="day" stroke={isDark ? "#9CA3AF" : "#6B7280"} />
            <YAxis stroke={isDark ? "#9CA3AF" : "#6B7280"} />
            <Tooltip />
            <Legend />
            <Bar dataKey="actual" fill="#2563EB" />
            <Line type="monotone" dataKey="forecast" stroke="#10B981" />
          </ComposedChart>
        );
      case "line":
        return (
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#1F2937" : "#E5E7EB"}
            />
            <XAxis
              dataKey="day"
              stroke={isDark ? "#9CA3AF" : "#6B7280"}
              tickLine={false}
            />
            <YAxis
              stroke={isDark ? "#9CA3AF" : "#6B7280"}
              domain={[0, 60]}
              ticks={[0, 15, 30, 45, 60]}
              tickLine={false}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              name="Actual Admissions"
              dataKey="actual"
              stroke="#2563EB"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              name="Forecasted Admissions"
              dataKey="forecast"
              stroke="#10B981"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </LineChart>
        );

      case "pie":
        // Calculate totals for pie chart
        const actualTotal = admissionsData.actual.reduce(
          (sum, val) => sum + val,
          0
        );
        const forecastTotal = admissionsData.forecast.reduce(
          (sum, val) => sum + val,
          0
        );
        const pieData = [
          { name: "Actual Admissions", value: actualTotal, fill: "#2563EB" },
          {
            name: "Forecasted Admissions",
            value: forecastTotal,
            fill: "#10B981",
          },
        ];

        return (
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={0}
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        );

      case "donut":
        // Calculate totals for donut chart
        const actualDonutTotal = admissionsData.actual.reduce(
          (sum, val) => sum + val,
          0
        );
        const forecastDonutTotal = admissionsData.forecast.reduce(
          (sum, val) => sum + val,
          0
        );
        const donutData = [
          {
            name: "Actual Admissions",
            value: actualDonutTotal,
            fill: "#2563EB",
          },
          {
            name: "Forecasted Admissions",
            value: forecastDonutTotal,
            fill: "#10B981",
          },
        ];

        return (
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={donutData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={60} // This creates the donut hole
              dataKey="value"
              label
            >
              {donutData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        );

      case "bar":
      default:
        return (
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#1F2937" : "#E5E7EB"}
            />
            <XAxis
              dataKey="day"
              stroke={isDark ? "#9CA3AF" : "#6B7280"}
              tickLine={false}
            />
            <YAxis
              stroke={isDark ? "#9CA3AF" : "#6B7280"}
              domain={[0, 60]}
              ticks={[0, 15, 30, 45, 60]}
              tickLine={false}
            />
            <Tooltip />
            <Legend />
            <Bar
              name="Actual Admissions"
              dataKey="actual"
              fill="#2563EB"
              radius={[4, 4, 0, 0]}
              opacity={0.9}
            />
            <Bar
              name="Forecasted Admissions"
              dataKey="forecast"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
              opacity={0.9}
            />
          </BarChart>
        );
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div id="dashboard-main" className="max-w-7xl mx-auto px-4 py-6">
        <div id="patient-stats" className="grid grid-cols-4 gap-4 mb-6">
          <div
            className={`p-4 rounded-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
          >
            <h3 className="text-sm text-gray-500">Forecasted Admissions</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">
                {metrics.forecasted_admissions.value}
              </span>
              <span className="ml-2 text-xs text-green-500">
                {metrics.forecasted_admissions.change}
              </span>
            </div>
          </div>

          <div
            className={`p-4 rounded-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
          >
            <h3 className="text-sm text-gray-500">ICU Beds Required</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">
                {metrics.icu_beds.value}
              </span>
              <span className="ml-2 text-xs text-gray-500">
                {metrics.icu_beds.detail}
              </span>
            </div>
          </div>

          <div
            className={`p-4 rounded-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
          >
            <h3 className="text-sm text-gray-500">Staff Needed</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">
                {metrics.staff_needed.value}
              </span>
              <span className="ml-2 text-xs text-gray-500">
                {metrics.staff_needed.detail}
              </span>
            </div>
          </div>

          <div
            className={`p-4 rounded-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
          >
            <h3 className="text-sm text-gray-500">Avg. Length of Stay</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">
                {metrics.avg_los.value}
              </span>
              <span className="ml-2 text-xs text-gray-500">
                {metrics.avg_los.unit}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-4 gap-4">
          {/* 7-Day Admissions Forecast */}
          <div
            className={`col-span-3 p-4 rounded-lg ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  7-Day Admissions Forecast
                </h3>
                <p className="text-sm text-gray-500">
                  Projected patient admissions for the next week
                </p>
              </div>
              <button
                onClick={cycleForecastChartType}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2v12a2 2 0 002 2v2z" />
                </svg>
                {forecastChartType.charAt(0).toUpperCase() +
                  forecastChartType.slice(1)}{" "}
                View
              </button>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                {renderForecastChart(forecastChartType)}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Resource Utilization */}
          <div
            className={`p-4 rounded-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
          >
            <h3 className="text-lg font-semibold mb-2">Resource Utilization</h3>
            <p className="text-sm text-gray-500 mb-4">
              Current and forecasted resource usage
            </p>
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
                          ? "bg-red-500"
                          : (resource.current / resource.capacity) * 100 > 75
                          ? "bg-yellow-500"
                          : "bg-cyan-400"
                      }`}
                      style={{
                        width: `${
                          (resource.current / resource.capacity) * 100
                        }%`,
                      }}
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

const Dashboard: React.FC = () => {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // State declarations
  const [selectedDataset, setSelectedDataset] =
    useState<keyof typeof hospitalDatasets>("generalHospital");
  const [analyticsResults, setAnalyticsResults] = useState<any>(null);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    forecasted_admissions: { value: 42, change: "+11% from yesterday" },
    icu_beds: { value: 22, detail: "18/25 currently in use" },
    staff_needed: { value: 52, detail: "45 currently on-shift" },
    avg_los: { value: 4.2, unit: "days" },
  });

  const predictionService = useMemo(() => new HospitalPredictionService(), []);

  const initializePredictions = useCallback(async () => {
    try {
      const loadingToast = toast.loading("Updating predictions...");

      await predictionService.trainModel(
        hospitalDatasets[selectedDataset].patients
      );

      const predictions = await Promise.all(
        Array.from({ length: 7 }).map(async (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() + i);
          return predictionService.predictAdmissions(date);
        })
      );

      setMetrics((prev) => ({
        ...prev,
        forecasted_admissions: {
          value: predictions[0],
          change: `${(
            ((predictions[0] - predictions[1]) / predictions[1]) *
            100
          ).toFixed(1)}% from yesterday`,
        },
      }));

      toast.dismiss(loadingToast);
      toast.success("Predictions updated successfully");
    } catch (error) {
      console.error("Prediction error:", error);
      toast.error("Failed to update predictions");
    }
  }, [predictionService, selectedDataset]);

  useEffect(() => {
    initializePredictions();
  }, [initializePredictions]);

  // Update the handleExport function
  const handleExport = async () => {
    try {
      if (!dashboardRef.current) return;
      await exportToPDF(
        dashboardRef.current,
        [
          { name: "ICU Beds", current: 18, forecast: 22, capacity: 25 },
          { name: "General Beds", current: 120, forecast: 135, capacity: 150 },
          { name: "Ventilators", current: 12, forecast: 15, capacity: 20 },
          { name: "Staff", current: 45, forecast: 52, capacity: 55 },
          { name: "Operating Rooms", current: 6, forecast: 8, capacity: 10 }
        ].map(resource => ({
          name: resource.name,
          current: resource.current,
          forecast: resource.forecast,
          capacity: resource.capacity
        })),
        {
          hospitalName: "General Hospital",
          date: new Date().toISOString(),
          metrics: {
            icuBeds: metrics.icu_beds.value,
            staffing: metrics.staff_needed.value,
            avgLOS: metrics.avg_los.value
          },
          staffing: {
            current: parseInt(metrics.staff_needed.detail.split(" ")[0]),
            needed: metrics.staff_needed.value,
          },
          wardManagement: {
            icuBeds: {
              total: metrics.icu_beds.value,
              occupied: parseInt(metrics.icu_beds.detail.split("/")[0]),
            }
          }
        }
      );
      toast.success("Report downloaded successfully");
    } catch (error) {
      console.error("Error exporting:", error);
      toast.error("Failed to generate report");
    }
  };

  const [chartType, setChartType] = useState<ChartType>("bar");

  const cycleChartType = () => {
    const types: ChartType[] = [
      "bar",
      "line",
      "pie",
      "donut",
      "area",
      "scatter",
      "radar",
      "composed",
    ];
    const currentIndex = types.indexOf(chartType);
    setChartType(types[(currentIndex + 1) % types.length]);
  };

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="flex justify-end items-center gap-4 p-4">
        <select
          value={selectedDataset}
          onChange={(e) =>
            setSelectedDataset(e.target.value as keyof typeof hospitalDatasets)
          }
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700"
        >
          {Object.entries(hospitalDatasets).map(([key, dataset]) => (
            <option key={key} value={key}>
              {dataset.name}
            </option>
          ))}
        </select>

        <button
          onClick={cycleChartType}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2v12a2 2 0 002 2v2z" />
          </svg>
          Change Chart ({chartType})
        </button>

        <AnalyticsButton
          predictionService={predictionService}
          dataset={hospitalDatasets[selectedDataset]}
          onAnalysisComplete={setAnalyticsResults}
        />

        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Export Report
        </button>
      </div>

      <div
        ref={dashboardRef}
        className={`p-4 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <DashboardContentWithChart chartType={chartType} metrics={metrics} />
        {analyticsResults && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Analytics Results</h2>
            <AnalyticsResults
              results={analyticsResults}
              isDark={isDark}
              chartType={chartType as "bar" | "line" | "pie" | "donut"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
// Remove or install @anthropic-ai/sdk package if needed
// npm install @anthropic-ai/sdk
