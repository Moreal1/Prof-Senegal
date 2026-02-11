import React, { useState, useEffect } from 'react';
import { getClasses, createClass, deleteClass } from '../../api/classes';
import { getSchools } from '../../api/schools';
import {
  Container, Typography, Paper, List, ListItem, ListItemText,
  ListItemSecondaryAction, IconButton, Button, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField,
  FormControl, InputLabel, Select, MenuItem, Box, Alert, Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', subject: '', school_id: '' });

  const fetchData = async () => {
    try {
      const [cRes, sRes] = await Promise.all([getClasses(), getSchools()]);
      setClasses(cRes.data);
      setSchools(sRes.data);
    } catch (err) { setError('Erreur de chargement'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async () => {
    try {
      await createClass(form);
      setOpen(false);
      setForm({ name: '', subject: '', school_id: '' });
      fetchData();
    } catch (err) { setError("Erreur lors de l'ajout"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette classe ?')) {
      await deleteClass(id);
      fetchData();
    }
  };

  if (loading) return <Typography>Chargement...</Typography>;

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>📚 Mes Classes</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ bgcolor: '#1a3d7c' }}>Ajouter</Button>
      </Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Paper elevation={2}>
        <List>
          {classes.length === 0 ? (
            <ListItem><ListItemText primary="Aucune classe" /></ListItem>
          ) : classes.map((cls) => (
            <ListItem key={cls.id} divider>
              <ListItemText primary={cls.name} secondary={`${cls.subject || ''} - ${cls.School?.name || ''}`} />
              <Chip label={cls.School?.type || ''} size="small" color={cls.School?.type === 'Public' ? 'success' : 'warning'} sx={{ mr: 2 }} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleDelete(cls.id)}><DeleteIcon color="error" /></IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Ajouter une classe</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Nom (ex: Terminale S1)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} margin="normal" required />
          <TextField fullWidth label="Matière" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} margin="normal" />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Établissement</InputLabel>
            <Select value={form.school_id} label="Établissement" onChange={(e) => setForm({ ...form, school_id: e.target.value })}>
              {schools.map((s) => <MenuItem key={s.id} value={s.id}>{s.name} ({s.type})</MenuItem>)}
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

export default ClassList;