import React, { useState, useEffect } from 'react';
import useSchedule from '../../hooks/useSchedule';
import { createSchedule, deleteSchedule } from '../../api/schedules';
import { getClasses } from '../../api/classes';
import { getSchools } from '../../api/schools';
import {
  Container, Typography, Paper, Box, Button, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField,
  FormControl, InputLabel, Select, MenuItem, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

const WeeklyView = () => {
  const { schedules, loading, refetch } = useSchedule();
  const [open, setOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [schools, setSchools] = useState([]);
  const [form, setForm] = useState({ day: 'Lundi', startTime: '08:00', endTime: '09:00', subject: '', classId: '', schoolId: '' });

  useEffect(() => {
    const load = async () => {
      try {
        const [cRes, sRes] = await Promise.all([getClasses(), getSchools()]);
        setClasses(cRes.data);
        setSchools(sRes.data);
      } catch (err) { console.error(err); }
    };
    load();
  }, []);

  const handleSubmit = async () => {
    try {
      await createSchedule(form);
      setOpen(false);
      setForm({ day: 'Lundi', startTime: '08:00', endTime: '09:00', subject: '', classId: '', schoolId: '' });
      refetch();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ?')) { await deleteSchedule(id); refetch(); }
  };

  const getSlot = (day, time) => schedules.filter(s => s.day === day && s.startTime === time);

  if (loading) return <Typography>Chargement...</Typography>;

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>📅 Emploi du Temps</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ bgcolor: '#1a3d7c' }}>Ajouter</Button>
      </Box>
      <TableContainer component={Paper} elevation={2}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#1a3d7c' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Heure</TableCell>
              {days.map(d => <TableCell key={d} align="center" sx={{ color: 'white', fontWeight: 'bold' }}>{d}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {timeSlots.map(time => (
              <TableRow key={time}>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>{time}</TableCell>
                {days.map(day => {
                  const items = getSlot(day, time);
                  return (
                    <TableCell key={`${day}-${time}`} sx={{ p: 0.5, minWidth: 120 }}>
                      {items.map(item => (
                        <Box key={item.id} sx={{ bgcolor: '#e3f2fd', borderRadius: 1, p: 0.5, mb: 0.5, fontSize: '0.75rem', position: 'relative' }}>
                          <strong>{item.subject}</strong><br />
                          <span>{item.Class?.name}</span>
                          <IconButton size="small" onClick={() => handleDelete(item.id)} sx={{ position: 'absolute', top: 0, right: 0, p: 0 }}>
                            <DeleteIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                        </Box>
                      ))}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Ajouter un cours</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Jour</InputLabel>
            <Select value={form.day} label="Jour" onChange={(e) => setForm({ ...form, day: e.target.value })}>
              {days.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField fullWidth label="Début" type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} margin="normal" InputLabelProps={{ shrink: true }} />
            <TextField fullWidth label="Fin" type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} margin="normal" InputLabelProps={{ shrink: true }} />
          </Box>
          <TextField fullWidth label="Matière" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} margin="normal" required />
          <FormControl fullWidth margin="normal">
            <InputLabel>Classe</InputLabel>
            <Select value={form.classId} label="Classe" onChange={(e) => setForm({ ...form, classId: e.target.value })}>
              {classes.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Établissement</InputLabel>
            <Select value={form.schoolId} label="Établissement" onChange={(e) => setForm({ ...form, schoolId: e.target.value })}>
              {schools.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#1a3d7c' }}>Ajouter</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default WeeklyView;