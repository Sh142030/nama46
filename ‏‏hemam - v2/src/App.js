import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';

// الصفحات
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import StrategicGoals from './pages/StrategicGoals';
import Initiatives from './pages/Initiatives';
import OperationalActivities from './pages/OperationalActivities';
import KPIs from './pages/KPIs';
import Departments from './pages/Departments';
import Reports from './pages/Reports';
import NotFound from './pages/NotFound';

// المكونات
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { user, loading } = useApp();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      
      <Route element={<ProtectedRoute user={user} />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/strategic-goals" element={<StrategicGoals />} />
          <Route path="/initiatives" element={<Initiatives />} />
          <Route path="/operational-activities" element={<OperationalActivities />} />
          <Route path="/kpis" element={<KPIs />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;