import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { ThemeProvider } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import PatientManagement from './pages/PatientManagement';
import StaffManagement from './pages/StaffManagement';
import ForecastsPage from './pages/ForecastsPage';
import ResourcesPage from './pages/ResourcesPage';
import CalendarPage from './pages/CalendarPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Layout component that includes the Navbar and renders children via Outlet
const DashboardLayout: React.FC = () => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <Navbar />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes with dashboard layout */}
            <Route element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route path="/" element={<Dashboard />} />
              <Route path="/patients" element={<PatientManagement />} />
              <Route path="/staff" element={<StaffManagement />} />
              <Route path="/forecasts" element={<ForecastsPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/upload" element={<Dashboard />} />
            </Route>
            
            {/* Catch all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;