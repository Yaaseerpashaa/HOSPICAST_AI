import React, { useState } from 'react';
import { Bed, Bell, FileText, X } from 'lucide-react';

interface NavItem {
  path: string;
  name: string;
  icon: React.ReactNode;
  notifications?: number;
}

interface Alert {
  id: number;
  message: string;
  time: string;
  type: 'warning' | 'critical' | 'info';
}

const alerts: Alert[] = [
  { id: 1, message: 'ICU Bed capacity reaching 90%', time: '5 min ago', type: 'warning' },
  { id: 2, message: 'Emergency staff shortage in Pediatric Ward', time: '10 min ago', type: 'critical' },
  { id: 3, message: 'New equipment maintenance scheduled', time: '1 hour ago', type: 'info' },
];

const navItems: NavItem[] = [
  {
    path: '/resources',
    name: 'Resources',
    icon: <Bed className="w-5 h-5" />
  },
  {
    path: '/alerts',
    name: 'Alerts',
    icon: <Bell className="w-5 h-5" />,
    notifications: alerts.length
  },
  {
    path: '/reports',
    name: 'Reports',
    icon: <FileText className="w-5 h-5" />
  }
];

const Sidebar: React.FC = () => {
  const [showAlerts, setShowAlerts] = useState(false);

  const handleAlertClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowAlerts(!showAlerts);
  };

  return (
    <>
      <nav className="space-y-2 relative">
        {navItems.map((item) => (
          <div 
            key={item.path} 
            className="flex items-center justify-between px-4 py-2 hover:bg-gray-700 rounded-lg cursor-pointer"
            onClick={item.name === 'Alerts' ? handleAlertClick : undefined}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.name}</span>
            </div>
            {item.notifications && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {item.notifications}
              </span>
            )}
          </div>
        ))}

        {/* Alerts Popup */}
        {showAlerts && (
          <div className="absolute left-full ml-2 top-0 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <button 
                onClick={() => setShowAlerts(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-3 rounded-lg ${
                    alert.type === 'critical' ? 'bg-red-900/50' :
                    alert.type === 'warning' ? 'bg-yellow-900/50' :
                    'bg-blue-900/50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <p className="text-sm">{alert.message}</p>
                  </div>
                  <span className="text-xs text-gray-400 mt-2 block">{alert.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Sidebar;