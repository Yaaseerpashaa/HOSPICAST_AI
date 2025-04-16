import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';

const UploadData: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);

  const handleFileUpload = (file: File | null, type: 'file1' | 'file2') => {
    if (!file) return;
    
    // Add your file upload logic here
    toast.success(`${file.name} selected successfully`);
    if (type === 'file1') setFile1(file);
    else setFile2(file);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          Upload Hospital Data
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* First Upload Section */}
        <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800/80' : 'bg-white/90'} shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all`}>
          <h2 className="text-2xl font-semibold mb-6 text-indigo-600 dark:text-indigo-400">Patient Data Upload</h2>
          <div className="border-3 border-dashed border-indigo-200 dark:border-indigo-800 rounded-xl p-10 text-center transition-all hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20">
            <input
              type="file"
              id="file1"
              className="hidden"
              accept=".csv,.xlsx"
              onChange={(e) => handleFileUpload(e.target.files?.[0] || null, 'file1')}
            />
            <label
              htmlFor="file1"
              className="cursor-pointer flex flex-col items-center group"
            >
              <Upload className="w-16 h-16 text-indigo-500 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform" />
              <p className="text-xl mb-3 font-medium text-gray-700 dark:text-gray-200">Drop your file here or click to upload</p>
              <p className="text-sm text-indigo-500 dark:text-indigo-400">Supported formats: CSV, Excel</p>
              {file1 && (
                <p className="mt-4 text-sm font-medium text-emerald-500">Selected: {file1.name}</p>
              )}
            </label>
          </div>
        </div>

        {/* Second Upload Section */}
        <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800/80' : 'bg-white/90'} shadow-xl backdrop-blur-sm`}>
          <h2 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-blue-400">Resource Data Upload</h2>
          <div className="border-3 border-dashed border-blue-200 dark:border-blue-800 rounded-xl p-10 text-center transition-all hover:border-blue-400 dark:hover:border-blue-600">
            <input
              type="file"
              id="file2"
              className="hidden"
              accept=".json,.xml"
              onChange={(e) => handleFileUpload(e.target.files?.[0] || null, 'file2')}
            />
            <label
              htmlFor="file2"
              className="cursor-pointer flex flex-col items-center group"
            >
              <Upload className="w-16 h-16 text-blue-500 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
              <p className="text-xl mb-3 font-medium text-gray-700 dark:text-gray-200">Drop your file here or click to upload</p>
              <p className="text-sm text-blue-500 dark:text-blue-400">Supported formats: JSON, XML</p>
              {file2 && (
                <p className="mt-4 text-sm font-medium text-emerald-500">Selected: {file2.name}</p>
              )}
            </label>
          </div>
        </div>

        {/* File Format Information */}
        <div className={`col-span-2 p-8 rounded-2xl ${isDark ? 'bg-gray-800/80' : 'bg-white/90'} shadow-xl backdrop-blur-sm mt-8`}>
          <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Supported File Formats
          </h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-700/50 dark:to-gray-800/50">
              <h3 className="font-semibold mb-4 text-lg text-indigo-600 dark:text-indigo-400">Patient Data Format</h3>
              <ul className="list-disc list-inside text-sm space-y-3 text-gray-700 dark:text-gray-300">
                <li>CSV files with patient information</li>
                <li>Excel sheets (.xlsx) with structured data</li>
                <li>Required columns: ID, Name, Age, Department</li>
                <li>Maximum file size: 10MB</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700/50 dark:to-gray-800/50">
              <h3 className="font-semibold mb-4 text-lg text-blue-600 dark:text-blue-400">Resource Data Format</h3>
              <ul className="list-disc list-inside text-sm space-y-3 text-gray-700 dark:text-gray-300">
                <li>JSON files with resource details</li>
                <li>XML files with structured data</li>
                <li>Required fields: Resource ID, Type, Capacity</li>
                <li>Maximum file size: 5MB</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadData;