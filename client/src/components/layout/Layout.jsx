import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;