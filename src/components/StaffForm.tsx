import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserPlus, AlertCircle, Loader2 } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface StaffFormProps {
  onSuccess: () => void;
}

const StaffForm: React.FC<StaffFormProps> = ({ onSuccess }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [shift, setShift] = useState('Morning');
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

      // In a real implementation, this would be a Supabase insert
      // const { error } = await supabase
      //   .from('staff')
      //   .insert([
      //     {
      //       name,
      //       role,
      //       department,
      //       shift,
      //       status: 'Active',
      //       user_id: user.id,
      //     },
      //   ]);
      // if (error) throw error;
      
      // Simulate success after a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSuccess(true);
      onSuccess();
      
      // Reset form
      setName('');
      setRole('');
      setDepartment('');
      setShift('Morning');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
        <UserPlus className="h-5 w-5 text-green-600 dark:text-green-400" />
        Add New Staff Member
      </h3>
      
      {success && (
        <div className="mb-4 p-3 bg-green-50/80 dark:bg-green-900/30 border border-green-100 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-700 dark:text-green-300">
            Staff member added successfully!
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white"
            placeholder="Enter staff member's full name"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white"
            required
          >
            <option value="">Select Role</option>
            <option value="Physician">Physician</option>
            <option value="Nurse">Nurse</option>
            <option value="Technician">Technician</option>
            <option value="Administrator">Administrator</option>
            <option value="Support Staff">Support Staff</option>
          </select>
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
            <option value="Emergency">Emergency</option>
            <option value="ICU">ICU</option>
            <option value="Surgery">Surgery</option>
            <option value="Radiology">Radiology</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Shift</label>
          <div className="flex flex-wrap gap-4">
            {['Morning', 'Evening', 'Night'].map(shiftOption => (
              <label key={shiftOption} className="flex items-center">
                <input
                  type="radio"
                  name="shift"
                  checked={shift === shiftOption}
                  onChange={() => setShift(shiftOption)}
                  className="mr-2"
                />
                <span className="text-gray-700 dark:text-gray-300">{shiftOption}</span>
              </label>
            ))}
          </div>
        </div>
        
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0" />
            <p className="text-red-600 dark:text-red-300 text-sm">{error}</p>
          </div>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors duration-200 
            bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white
            disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <span>Add Staff Member</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default StaffForm; 