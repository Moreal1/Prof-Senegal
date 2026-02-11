import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderIcon from '@mui/icons-material/Folder';

const drawerWidth = 240;
const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Établissements', icon: <SchoolIcon />, path: '/schools' },
  { text: 'Emploi du Temps', icon: <ScheduleIcon />, path: '/schedule' },
  { text: 'Classes', icon: <ClassIcon />, path: '/classes' },
  { text: 'Devoirs', icon: <AssignmentIcon />, path: '/assignments' },
  { text: 'Documents', icon: <FolderIcon />, path: '/documents' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer variant="permanent" sx={{
      width: drawerWidth,
      '& .MuiDrawer-paper': { width: drawerWidth, bgcolor: '#1a3d7c', color: 'white' },
    }}>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>🇸🇳 Prof Sénégal</Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': { bgcolor: 'rgba(255,255,255,0.15)' },
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              }}>
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;