import React, { useState } from 'react';
import BackgroundPattern from '../components/BackgroundPattern';
import { useTheme } from '../hooks/useTheme';
import {
  Users,
  Bed,
  Thermometer,
  HeartPulse,
  Plus,
  Calendar,
  RefreshCw
} from 'lucide-react';

// Ward types
const wardTypes = [
  { id: 'general', name: 'General Ward' },
  { id: 'icu', name: 'Intensive Care Unit' },
  { id: 'cardiac', name: 'Cardiac Ward' },
  { id: 'pediatric', name: 'Pediatric Ward' },
  { id: 'maternity', name: 'Maternity Ward' },
  { id: 'surgery', name: 'Surgery Ward' }
];

// Initial ward and bed data
const initialWards = [
  { 
    id: 'general-a',
    name: 'General Ward - A Wing',
    type: 'general',
    totalBeds: 40,
    occupiedBeds: 32,
    reservedBeds: 2,
    staffAssigned: 8,
    floor: '2nd Floor',
    lastUpdated: '1 hour ago'
  },
  { 
    id: 'general-b',
    name: 'General Ward - B Wing',
    type: 'general',
    totalBeds: 40,
    occupiedBeds: 28,
    reservedBeds: 4,
    staffAssigned: 7,
    floor: '2nd Floor',
    lastUpdated: '30 min ago'
  },
  { 
    id: 'icu-main',
    name: 'Main ICU',
    type: 'icu',
    totalBeds: 20,
    occupiedBeds: 18,
    reservedBeds: 1,
    staffAssigned: 15,
    floor: '3rd Floor',
    lastUpdated: '15 min ago'
  },
  { 
    id: 'icu-cardiac',
    name: 'Cardiac ICU',
    type: 'icu',
    totalBeds: 12,
    occupiedBeds: 9,
    reservedBeds: 1,
    staffAssigned: 10,
    floor: '3rd Floor',
    lastUpdated: '45 min ago'
  },
  { 
    id: 'pediatric-main',
    name: 'Pediatric Ward',
    type: 'pediatric',
    totalBeds: 30,
    occupiedBeds: 22,
    reservedBeds: 2,
    staffAssigned: 12,
    floor: '4th Floor',
    lastUpdated: '2 hours ago'
  },
  { 
    id: 'maternity',
    name: 'Maternity Ward',
    type: 'maternity',
    totalBeds: 25,
    occupiedBeds: 19,
    reservedBeds: 3,
    staffAssigned: 10,
    floor: '5th Floor',
    lastUpdated: '1 hour ago'
  }
];

const ResourcesPage: React.FC = () => {
  useTheme();
// Removed unused isDark variable
  const [wards, setWards] = useState(initialWards);
  const [selectedWardType, setSelectedWardType] = useState<string>('all');
  const [showAddWardModal, setShowAddWardModal] = useState(false);
  const [newWard, setNewWard] = useState({
    name: '',
    type: 'general',
    totalBeds: 20,
    floor: '1st Floor'
  });
  const [refreshing, setRefreshing] = useState(false);

  // Filter wards based on selected type
  const filteredWards = selectedWardType === 'all' 
    ? wards 
    : wards.filter(ward => ward.type === selectedWardType);

  // Calculate total stats
  const totalStats = wards.reduce((acc, ward) => {
    acc.totalBeds += ward.totalBeds;
    acc.occupiedBeds += ward.occupiedBeds;
    acc.availableBeds += (ward.totalBeds - ward.occupiedBeds - ward.reservedBeds);
    acc.reservedBeds += ward.reservedBeds;
    return acc;
  }, { totalBeds: 0, occupiedBeds: 0, availableBeds: 0, reservedBeds: 0 });

  // Simulate refreshing the data
  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // Add new ward
  const handleAddWard = () => {
    const newWardObj = {
      id: `${newWard.type}-${Date.now()}`,
      name: newWard.name,
      type: newWard.type,
      totalBeds: newWard.totalBeds,
      occupiedBeds: 0,
      reservedBeds: 0,
      staffAssigned: Math.floor(newWard.totalBeds / 5), // Rough estimate based on beds
      floor: newWard.floor,
      lastUpdated: 'Just now'
    };
    
    setWards([...wards, newWardObj]);
    setShowAddWardModal(false);
    setNewWard({
      name: '',
      type: 'general',
      totalBeds: 20,
      floor: '1st Floor'
    });
  };

  // Get ward type background color
  const getWardTypeColor = (type: string) => {
    switch (type) {
      case 'general': return 'bg-blue-500';
      case 'icu': return 'bg-red-500';
      case 'cardiac': return 'bg-purple-500';
      case 'pediatric': return 'bg-green-500';
      case 'maternity': return 'bg-pink-500';
      case 'surgery': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  // Calculate bed usage percentage for a ward
  const getBedUsagePercent = (ward: typeof initialWards[0]) => {
    return Math.round((ward.occupiedBeds / ward.totalBeds) * 100);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      <BackgroundPattern variant="dashboard" />
      
      <div className="relative z-10 p-3 md:p-4">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Hospital Ward Management
              </h1>
              <p className="text-gray-700 dark:text-gray-300">
                Manage hospital wards, beds, and resources
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddWardModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg shadow hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Ward</span>
              </button>
              
              <button
                onClick={refreshData}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </header>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Beds</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalStats.totalBeds}</h3>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                  <Bed className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Occupied</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalStats.occupiedBeds}</h3>
                </div>
                <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg">
                  <Users className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-red-500" 
                    style={{ width: `${Math.round((totalStats.occupiedBeds / totalStats.totalBeds) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Available</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalStats.availableBeds}</h3>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                  <Thermometer className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Reserved</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalStats.reservedBeds}</h3>
                </div>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
                  <Calendar className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Ward Type Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedWardType('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedWardType === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                All Wards
              </button>
              
              {wardTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedWardType(type.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedWardType === type.id
                      ? `${getWardTypeColor(type.id)} text-white`
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          {/* Wards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredWards.map(ward => (
              <div 
                key={ward.id} 
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <div className={`${getWardTypeColor(ward.type)} h-2`}></div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{ward.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{ward.floor} • {wardTypes.find(t => t.id === ward.type)?.name}</p>
                    </div>
                    <div className="flex items-center">
                      <HeartPulse className="w-5 h-5 text-red-500 mr-1" />
                      <span className={`text-sm font-medium ${
                        getBedUsagePercent(ward) > 90 ? 'text-red-600 dark:text-red-400' :
                        getBedUsagePercent(ward) > 75 ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-green-600 dark:text-green-400'
                      }`}>
                        {getBedUsagePercent(ward)}% Occupied
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Total Beds:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{ward.totalBeds}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Occupied Beds:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{ward.occupiedBeds}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Reserved Beds:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{ward.reservedBeds}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Available Beds:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {ward.totalBeds - ward.occupiedBeds - ward.reservedBeds}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Staff Assigned:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{ward.staffAssigned}</span>
                    </div>

                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          getBedUsagePercent(ward) > 90 ? 'bg-red-500' :
                          getBedUsagePercent(ward) > 75 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`} 
                        style={{ width: `${getBedUsagePercent(ward)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Last updated: {ward.lastUpdated}</span>
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Ward Modal */}
      {showAddWardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Add New Ward</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Ward Name</label>
                <input
                  type="text"
                  value={newWard.name}
                  onChange={(e) => setNewWard({...newWard, name: e.target.value})}
                  className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white"
                  placeholder="Enter ward name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Ward Type</label>
                <select
                  value={newWard.type}
                  onChange={(e) => setNewWard({...newWard, type: e.target.value})}
                  className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white"
                  required
                >
                  {wardTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Total Beds</label>
                <input
                  type="number"
                  value={newWard.totalBeds}
                  onChange={(e) => setNewWard({...newWard, totalBeds: parseInt(e.target.value) || 0})}
                  className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white"
                  min={1}
                  max={100}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Floor</label>
                <select
                  value={newWard.floor}
                  onChange={(e) => setNewWard({...newWard, floor: e.target.value})}
                  className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white"
                  required
                >
                  <option value="1st Floor">1st Floor</option>
                  <option value="2nd Floor">2nd Floor</option>
                  <option value="3rd Floor">3rd Floor</option>
                  <option value="4th Floor">4th Floor</option>
                  <option value="5th Floor">5th Floor</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={() => setShowAddWardModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddWard}
                disabled={!newWard.name || newWard.totalBeds < 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Ward
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesPage; 