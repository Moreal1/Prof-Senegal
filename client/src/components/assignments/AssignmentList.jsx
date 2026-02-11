import React, { useState, useEffect } from 'react';
import { getAssignments, createAssignment, updateAssignment, deleteAssignment } from '../../api/assignments';
import { getClasses } from '../../api/classes';
import {
  Container, Typography, Paper, Box, Button, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField,
  FormControl, InputLabel, Select, MenuItem, Chip,
  List, ListItem, ListItemText, ListItemSecondaryAction,
  IconButton, Tabs, Tab, Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', description: '', due_date: '', type: 'Devoir en classe', subject: '', class_id: '' });

  const fetchData = async () => {
    try {
      const [aRes, cRes] = await Promise.all([getAssignments(), getClasses()]);
      setAssignments(aRes.data);
      setClasses(cRes.data);
    } catch (err) { setError('Erreur de chargement'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async () => {
    try {
      await createAssignment(form);
      setOpen(false);
      setForm({ title: '', description: '', due_date: '', type: 'Devoir en classe', subject: '', class_id: '' });
      fetchData();
    } catch (err) { setError("Erreur lors de l'ajout"); }
  };

  const toggleStatus = async (a) => {
    const newStatus = a.status === 'to_correct' ? 'corrected' : 'to_correct';
    await updateAssignment(a.id, { status: newStatus });
    fetchData();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ?')) { await deleteAssignment(id); fetchData(); }
  };

  const filtered = tab === 0
    ? assignments.filter(a => a.status === 'to_correct')
    : assignments.filter(a => a.status === 'corrected');

  if (loading) return <Typography>Chargement...</Typography>;

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>📝 Devoirs</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ bgcolor: '#1a3d7c' }}>Nouveau</Button>
      </Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Paper elevation={2}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label={`À Corriger (${assignments.filter(a => a.status === 'to_correct').length})`} />
          <Tab label={`Corrigés (${assignments.filter(a => a.status === 'corrected').length})`} />
        </Tabs>
        <List>
          {filtered.length === 0 ? (
            <ListItem><ListItemText primary="Aucun devoir" /></ListItem>
          ) : filtered.map((a) => (
            <ListItem key={a.id} divider>
              <ListItemText primary={a.title} secondary={`${a.subject} - ${a.Class?.name || ''} - ${a.due_date}`} />
              <Chip label={a.status === 'to_correct' ? 'À Corriger' : 'Corrigé'} color={a.status === 'to_correct' ? 'warning' : 'success'} size="small" sx={{ mr: 1 }} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => toggleStatus(a)}>
                  {a.status === 'to_correct' ? <CheckCircleIcon color="success" /> : <PendingIcon color="warning" />}
                </IconButton>
                <IconButton onClick={() => handleDelete(a.id)}><DeleteIcon color="error" /></IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Créer un devoir</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Titre" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} margin="normal" required />
          <TextField fullWidth label="Matière" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} margin="normal" required />
          <TextField fullWidth label="Date" type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} margin="normal" InputLabelProps={{ shrink: true }} required />
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select value={form.type} label="Type" onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <MenuItem value="Devoir en classe">Devoir en classe</MenuItem>
              <MenuItem value="Devoir maison">Devoir maison</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Classe</InputLabel>
            <Select value={form.class_id} label="Classe" onChange={(e) => setForm({ ...form, class_id: e.target.value })}>
              {classes.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField fullWidth label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} margin="normal" multiline rows={3} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#1a3d7c' }}>Créer</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AssignmentList;