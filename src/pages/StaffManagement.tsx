import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import TableView from '../components/TableView';
import BackgroundPattern from '../components/BackgroundPattern';
import { UserRound, RefreshCw, AlertTriangle, Plus } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const staffColumns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
  { key: 'department', header: 'Department' },
  { key: 'shift', header: 'Shift' },
  { key: 'status', header: 'Status' },
];

// Mock data for staff (will be replaced with database calls)
const mockStaffData = [
  { id: 'S001', name: 'Dr. Sarah Johnson', role: 'Physician', department: 'Cardiology', shift: 'Morning', status: 'Active' },
  { id: 'S002', name: 'Dr. Michael Chen', role: 'Physician', department: 'Neurology', shift: 'Evening', status: 'Active' },
  { id: 'S003', name: 'Nurse Robert Taylor', role: 'Nurse', department: 'ICU', shift: 'Night', status: 'Active' },
  { id: 'S004', name: 'Nurse Emily Davis', role: 'Nurse', department: 'Emergency', shift: 'Morning', status: 'Active' },
  { id: 'S005', name: 'Dr. Lisa Wong', role: 'Physician', department: 'Pediatrics', shift: 'Morning', status: 'On Leave' },
  { id: 'S006', name: 'Tech James Wilson', role: 'Technician', department: 'Radiology', shift: 'Evening', status: 'Active' },
  { id: 'S007', name: 'Nurse Amanda Miller', role: 'Nurse', department: 'Orthopedics', shift: 'Morning', status: 'Active' },
  { id: 'S008', name: 'Dr. David Anderson', role: 'Physician', department: 'Surgery', shift: 'Evening', status: 'Active' },
];

const StaffManagement: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [staff, setStaff] = useState(mockStaffData);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [newStaffMember, setNewStaffMember] = useState({
    name: '',
    role: '',
    department: '',
    shift: 'Morning',
  });

  // This would fetch from Supabase in a real implementation
  const fetchStaff = async () => {
    try {
      setRefreshing(true);
      setError(null);
      
      // In a real implementation, this would call Supabase:
      // const { data, error } = await supabase
      //   .from('staff')
      //   .select('*')
      //   .order('name', { ascending: true });
      
      // if (error) throw error;
      // setStaff(data || []);
      
      // For now, just simulate a network delay
      setTimeout(() => {
        setStaff(mockStaffData);
        setLoading(false);
        setRefreshing(false);
      }, 600);
      
    } catch (error) {
      console.error('Error fetching staff:', error);
      setError('Failed to load staff data. Please try again.');
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleAddStaff = () => {
    // This would be a Supabase insert in a real implementation
    const newId = `S${String(staff.length + 1).padStart(3, '0')}`;
    const newStaff = {
      id: newId,
      ...newStaffMember,
      status: 'Active',
    };
    
    setStaff([...staff, newStaff]);
    setShowAddStaffModal(false);
    setNewStaffMember({
      name: '',
      role: '',
      department: '',
      shift: 'Morning',
    });
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      <BackgroundPattern variant="dashboard" />
      
      <div className="relative z-10 p-3 md:p-5">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
            <div className="flex items-center gap-3">
              <UserRound className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Staff Management
                </h1>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Manage hospital staff assignments, schedules, and status
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowAddStaffModal(true)}
                className={`flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg shadow hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <Plus className="w-4 h-4" />
                <span>Add Staff</span>
              </button>
              
              <button 
                onClick={fetchStaff}
                disabled={refreshing}
                className={`flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow border ${
                  isDark ? 'border-gray-700 text-gray-200 hover:bg-gray-700' : 'border-gray-100 text-gray-700 hover:bg-gray-50'
                } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''} ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <span>Refresh Data</span>
              </button>
            </div>
          </header>

          {error && (
            <div className="mb-6 p-4 bg-red-50/80 dark:bg-red-900/30 rounded-lg border border-red-100 dark:border-red-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Staff Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400 mb-1">Total Staff</h3>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{staff.length}</p>
            </div>
            
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400 mb-1">Physicians</h3>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {staff.filter(s => s.role === 'Physician').length}
              </p>
            </div>
            
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400 mb-1">Nurses</h3>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {staff.filter(s => s.role === 'Nurse').length}
              </p>
            </div>
            
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400 mb-1">On Leave</h3>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {staff.filter(s => s.status === 'On Leave').length}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <TableView
              title="Staff Directory"
              columns={staffColumns}
              data={staff}
            />
          </div>
          
          {/* Add Staff Modal */}
          {showAddStaffModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Add New Staff Member</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label>
                    <input
                      type="text"
                      value={newStaffMember.name}
                      onChange={(e) => setNewStaffMember({...newStaffMember, name: e.target.value})}
                      className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white"
                      placeholder="Full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Role</label>
                    <select
                      value={newStaffMember.role}
                      onChange={(e) => setNewStaffMember({...newStaffMember, role: e.target.value})}
                      className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white"
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
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Department</label>
                    <select
                      value={newStaffMember.department}
                      onChange={(e) => setNewStaffMember({...newStaffMember, department: e.target.value})}
                      className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white"
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
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Shift</label>
                    <div className="flex gap-4">
                      {['Morning', 'Evening', 'Night'].map(shift => (
                        <label key={shift} className="flex items-center">
                          <input
                            type="radio"
                            name="shift"
                            checked={newStaffMember.shift === shift}
                            onChange={() => setNewStaffMember({...newStaffMember, shift})}
                            className="mr-2"
                          />
                          <span className="text-gray-700 dark:text-gray-300">{shift}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex gap-3 justify-end">
                  <button
                    onClick={() => setShowAddStaffModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddStaff}
                    disabled={!newStaffMember.name || !newStaffMember.role || !newStaffMember.department}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Staff
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-center text-sm text-gray-700 dark:text-gray-300 pb-4">
            <p>Staff data refreshes automatically when actions are performed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffManagement; 