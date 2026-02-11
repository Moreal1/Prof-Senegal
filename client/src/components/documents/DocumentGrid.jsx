import React, { useState, useEffect } from 'react';
import useDocuments from '../../hooks/useDocuments';
import { uploadDocument } from '../../api/documents';
import { getClasses } from '../../api/classes';
import {
  Container, Typography, Box, Button, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField,
  FormControl, InputLabel, Select, MenuItem, Grid,
  Card, CardContent, CardActions, IconButton, Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import FolderIcon from '@mui/icons-material/Folder';

const DocumentGrid = () => {
  const { documents, loading, handleDelete, refetch } = useDocuments();
  const [open, setOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ title: '', subject: '', type: 'Cours', class_id: '', year: '2025', file: null });

  useEffect(() => {
    const load = async () => {
      try { const res = await getClasses(); setClasses(res.data); } catch (err) { console.error(err); }
    };
    load();
  }, []);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => { if (form[key]) formData.append(key, form[key]); });
      await uploadDocument(formData);
      setOpen(false);
      setForm({ title: '', subject: '', type: 'Cours', class_id: '', year: '2025', file: null });
      refetch();
    } catch (err) { console.error(err); }
  };

  const filtered = documents.filter(d =>
    d.title?.toLowerCase().includes(search.toLowerCase()) ||
    d.subject?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Typography>Chargement...</Typography>;

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>📂 Documents</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ bgcolor: '#1a3d7c' }}>Ajouter</Button>
      </Box>
      <TextField fullWidth label="🔍 Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} sx={{ mb: 3 }} />
      <Grid container spacing={2}>
        {filtered.length === 0 ? (
          <Grid item xs={12}><Typography align="center" color="text.secondary">Aucun document</Typography></Grid>
        ) : filtered.map((doc) => (
          <Grid item xs={12} sm={6} md={4} key={doc.id}>
            <Card elevation={2}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <FolderIcon sx={{ mr: 1, color: '#1a3d7c' }} />
                  <Typography variant="subtitle1" fontWeight="bold" noWrap>{doc.title}</Typography>
                </Box>
                <Chip label={doc.type} size="small" sx={{ mb: 1 }} />
                <Typography variant="body2" color="text.secondary">{doc.subject} - {doc.Class?.name || ''}</Typography>
              </CardContent>
              <CardActions>
                {doc.file_path && <IconButton href={doc.file_path} target="_blank"><DownloadIcon color="primary" /></IconButton>}
                <IconButton onClick={() => handleDelete(doc.id)}><DeleteIcon color="error" /></IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Ajouter un document</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Titre" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} margin="normal" required />
          <TextField fullWidth label="Matière" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} margin="normal" required />
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select value={form.type} label="Type" onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <MenuItem value="Cours">Cours</MenuItem>
              <MenuItem value="Sujets">Sujets</MenuItem>
              <MenuItem value="Corrigés">Corrigés</MenuItem>
              <MenuItem value="Exercices">Exercices</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Classe</InputLabel>
            <Select value={form.class_id} label="Classe" onChange={(e) => setForm({ ...form, class_id: e.target.value })}>
              {classes.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField fullWidth label="Année" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} margin="normal" />
          <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
            📎 Choisir un fichier
            <input type="file" hidden onChange={(e) => setForm({ ...form, file: e.target.files[0] })} />
          </Button>
          {form.file && <Typography variant="caption">{form.file.name}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#1a3d7c' }}>Upload</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DocumentGrid;