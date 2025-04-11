import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import PatientForm from '../components/PatientForm';
import TableView from '../components/TableView';
import BackgroundPattern from '../components/BackgroundPattern';
import { UsersRound, RefreshCw, AlertTriangle } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const patientColumns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'department', header: 'Department' },
  { key: 'admission_date', header: 'Admission Date' },
  { key: 'discharge_date', header: 'Discharge Date' },
  { key: 'status', header: 'Status' },
];

const PatientManagement: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = async () => {
    try {
      setRefreshing(true);
      setError(null);
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('admission_date', { ascending: false });
      
      if (error) throw error;
      setPatients(data || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
      setError('Failed to load patient data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      <BackgroundPattern variant="dashboard" />
      
      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <UsersRound className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Patient Management
                </h1>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Manage patient admissions, discharges, and records
                </p>
              </div>
            </div>
            
            <button 
              onClick={fetchPatients}
              disabled={refreshing}
              className={`flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow border ${
                isDark ? 'border-gray-700 text-gray-200 hover:bg-gray-700' : 'border-gray-100 text-gray-700 hover:bg-gray-50'
              } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''} ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <span>Refresh Data</span>
            </button>
          </header>

          {error && (
            <div className="mb-6 p-4 bg-red-50/80 dark:bg-red-900/30 rounded-lg border border-red-100 dark:border-red-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <PatientForm type="admit" onSuccess={fetchPatients} />
            <PatientForm type="discharge" onSuccess={fetchPatients} />
          </div>

          <div className="mb-8">
            <TableView
              title="Patient Records"
              columns={patientColumns}
              data={patients}
            />
          </div>
          
          <div className="text-center text-sm text-gray-700 dark:text-gray-300 pb-4">
            <p>Data refreshes automatically when actions are performed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientManagement;