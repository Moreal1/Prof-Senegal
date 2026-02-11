import React, { useState, useEffect } from 'react';
import { getSchools } from '../../api/schools';
import { getAssignments } from '../../api/assignments';
import TodaySchedule from './TodaySchedule';
import {
  Container, Typography, Grid, Paper, Box, Chip, List,
  ListItem, ListItemText, ListItemIcon,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';

const Dashboard = () => {
  const [schools, setSchools] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sRes, aRes] = await Promise.all([getSchools(), getAssignments()]);
        setSchools(sRes.data);
        setAssignments(aRes.data);
      } catch (err) { console.error(err); }
    };
    fetchData();
  }, []);

  const toCorrected = assignments.filter(a => a.status === 'to_correct');

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>👋 Bienvenue, Professeur !</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>🏫 Mes Établissements</Typography>
            <List>
              {schools.length === 0 ? (
                <ListItem><ListItemText primary="Aucun établissement" /></ListItem>
              ) : schools.map(s => (
                <ListItem key={s.id}>
                  <ListItemIcon><SchoolIcon color="primary" /></ListItemIcon>
                  <ListItemText primary={s.name} />
                  <Chip label={s.type} size="small" color={s.type === 'Public' ? 'success' : 'warning'} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}><TodaySchedule /></Grid>
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>📝 Devoirs à Corriger ({toCorrected.length})</Typography>
            <List>
              {toCorrected.length === 0 ? (
                <ListItem><ListItemText primary="Aucun devoir à corriger 🎉" /></ListItem>
              ) : toCorrected.slice(0, 5).map(a => (
                <ListItem key={a.id} divider>
                  <ListItemIcon><AssignmentIcon color="warning" /></ListItemIcon>
                  <ListItemText primary={a.title} secondary={`${a.subject} - ${a.due_date}`} />
                  <Chip label="À Corriger" color="warning" size="small" />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;