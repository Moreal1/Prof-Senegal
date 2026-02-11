import React, { useState, useEffect } from 'react';
import { getSchools, createSchool, deleteSchool } from '../../api/schools';
import {
  Container, Typography, Paper, List, ListItem, ListItemText,
  ListItemSecondaryAction, IconButton, Button, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField,
  FormControl, InputLabel, Select, MenuItem, Chip, Box, Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const SchoolList = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', type: 'Public' });

  const fetchData = async () => {
    try {
      const res = await getSchools();
      setSchools(res.data);
    } catch (err) { setError('Erreur de chargement'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async () => {
    try {
      await createSchool(form);
      setOpen(false);
      setForm({ name: '', type: 'Public' });
      fetchData();
    } catch (err) { setError("Erreur lors de l'ajout"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cet établissement ?')) {
      await deleteSchool(id);
      fetchData();
    }
  };

  if (loading) return <Typography>Chargement...</Typography>;

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>🏫 Mes Établissements</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ bgcolor: '#1a3d7c' }}>Ajouter</Button>
      </Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Paper elevation={2}>
        <List>
          {schools.length === 0 ? (
            <ListItem><ListItemText primary="Aucun établissement" /></ListItem>
          ) : schools.map((school) => (
            <ListItem key={school.id} divider>
              <ListItemText primary={school.name} secondary={`${school.Classes?.length || 0} classe(s)`} />
              <Chip label={school.type} color={school.type === 'Public' ? 'success' : 'warning'} size="small" sx={{ mr: 2 }} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleDelete(school.id)}><DeleteIcon color="error" /></IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Ajouter un établissement</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} margin="normal" required />
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select value={form.type} label="Type" onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <MenuItem value="Public">Public</MenuItem>
              <MenuItem value="Privé">Privé</MenuItem>
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

export default SchoolList;