import React from 'react';
import useSchedule from '../../hooks/useSchedule';
import { Paper, Typography, List, ListItem, ListItemText, Chip } from '@mui/material';

const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

const TodaySchedule = () => {
  const { schedules, loading } = useSchedule();
  const today = dayNames[new Date().getDay()];
  const todaySchedules = schedules.filter(s => s.day === today);

  if (loading) return <Typography>Chargement...</Typography>;

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>📅 Emploi du temps - {today}</Typography>
      {todaySchedules.length === 0 ? (
        <Typography color="text.secondary">Aucun cours aujourd'hui</Typography>
      ) : (
        <List>
          {todaySchedules.map((schedule, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={`${schedule.subject} - ${schedule.Class?.name || ''}`}
                secondary={`${schedule.startTime} - ${schedule.endTime}`}
              />
              <Chip label={schedule.School?.name || ''} size="small"
                color={schedule.School?.type === 'Public' ? 'primary' : 'secondary'} />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default TodaySchedule;