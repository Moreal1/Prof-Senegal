import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Dashboard from './components/dashboard/Dashboard';
import SchoolList from './components/schools/SchoolList';
import WeeklyView from './components/schedule/WeeklyView';
import ClassList from './components/classes/ClassList';
import AssignmentList from './components/assignments/AssignmentList';
import DocumentGrid from './components/documents/DocumentGrid';
import OfflineIndicator from './components/common/OfflineIndicator';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="schools" element={<SchoolList />} />
            <Route path="schedule" element={<WeeklyView />} />
            <Route path="classes" element={<ClassList />} />
            <Route path="assignments" element={<AssignmentList />} />
            <Route path="documents" element={<DocumentGrid />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <OfflineIndicator />
    </AuthProvider>
  );
}

export default App;