import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';

const UploadData: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [files, setFiles] = useState({
    patientData: null,
    equipmentLogs: null,
    staffSchedule: null
  });

  const handleFileChange = (type: string, file: File | null) => {
    setFiles(prev => ({ ...prev, [type]: file }));
  };

  const handleUpload = async () => {
    // TODO: Implement file upload logic
    console.log('Files to upload:', files);
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-semibold text-white">HospiCast AI</h1>
      </div>

      <div className="flex space-x-4 mb-6">
        <button className="text-gray-400">Upload Files</button>
        <button className="text-gray-400">File Format</button>
      </div>

      <div className="bg-[#1e2536] rounded-lg p-6">
        <h2 className="text-xl text-white mb-4">Upload Data Files</h2>
        <p className="text-gray-400 mb-6">Select CSV files containing patient data, equipment logs, and staff schedules</p>

        <div className="space-y-6">
          {/* Patient Data Upload */}
          <div>
            <h3 className="text-white mb-2">Patient Data (CSV)</h3>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => handleFileChange('patientData', e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-gray-700 file:text-white
                hover:file:bg-gray-600"
            />
            <p className="mt-2 text-sm text-gray-400">
              Contains patient_id, department, diagnosis, admit_time, age, severity
            </p>
          </div>

          {/* Equipment Logs Upload */}
          <div>
            <h3 className="text-white mb-2">Equipment Logs (CSV)</h3>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => handleFileChange('equipmentLogs', e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-gray-700 file:text-white
                hover:file:bg-gray-600"
            />
            <p className="mt-2 text-sm text-gray-400">
              Contains equipment_id, type, usage_start, usage_end, patient_id
            </p>
          </div>

          {/* Staff Schedule Upload */}
          <div>
            <h3 className="text-white mb-2">Staff Schedule (CSV)</h3>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => handleFileChange('staffSchedule', e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-gray-700 file:text-white
                hover:file:bg-gray-600"
            />
            <p className="mt-2 text-sm text-gray-400">
              Contains staff_id, name, role, shift_start, shift_end, department
            </p>
          </div>

          <button
            onClick={handleUpload}
            className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Upload and Process Files
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadData;