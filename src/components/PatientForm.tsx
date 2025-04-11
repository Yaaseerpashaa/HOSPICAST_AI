import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { UserPlus, UserMinus, AlertCircle, Loader2 } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface PatientFormProps {
  type: 'admit' | 'discharge';
  onSuccess: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ type, onSuccess }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [patientId, setPatientId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      if (!user) throw new Error('You must be logged in');

      if (type === 'admit') {
        const { error } = await supabase
          .from('patients')
          .insert([
            {
              name,
              department,
              status: 'Admitted',
              admission_date: new Date().toISOString(),
              user_id: user.id,
            },
          ]);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('patients')
          .update({ status: 'Discharged', discharge_date: new Date().toISOString() })
          .eq('id', patientId)
          .eq('user_id', user.id);
        if (error) throw error;
      }
      setSuccess(true);
      onSuccess();
      if (type === 'admit') {
        setName('');
        setDepartment('');
      } else {
        setPatientId('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
        {type === 'admit' ? (
          <>
            <UserPlus className="h-5 w-5 text-green-600 dark:text-green-400" />
            Admit New Patient
          </>
        ) : (
          <>
            <UserMinus className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            Discharge Patient
          </>
        )}
      </h3>
      
      {success && (
        <div className="mb-4 p-3 bg-green-50/80 dark:bg-green-900/30 border border-green-100 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-700 dark:text-green-300">
            {type === 'admit' ? 'Patient admitted successfully!' : 'Patient discharged successfully!'}
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'admit' ? (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white"
                required
              >
                <option value="">Select Department</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
              </select>
            </div>
          </>
        ) : (
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Patient ID</label>
            <input
              type="text"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white"
              placeholder="Enter patient ID to discharge"
              required
            />
          </div>
        )}
        
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0" />
            <p className="text-red-600 dark:text-red-300 text-sm">{error}</p>
          </div>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors duration-200 ${
            type === 'admit'
              ? 'bg-green-600 hover:bg-green-700 focus:bg-green-700 text-white'
              : 'bg-amber-600 hover:bg-amber-700 focus:bg-amber-700 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <span>{type === 'admit' ? 'Admit Patient' : 'Discharge Patient'}</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default PatientForm;