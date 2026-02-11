import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../api/auth';
import { Container, Paper, TextField, Button, Typography, Box, Alert } from '@mui/material';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    setLoading(true);
    try {
      await register({ email: formData.email, password: formData.password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: '#1a3d7c', fontWeight: 'bold' }}>
          📚 Prof Sénégal
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>Créer un compte</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" name="email" type="email" value={formData.email}
            onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Mot de passe" name="password" type="password" value={formData.password}
            onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Confirmer" name="confirmPassword" type="password" value={formData.confirmPassword}
            onChange={handleChange} margin="normal" required />
          <Button type="submit" fullWidth variant="contained" disabled={loading}
            sx={{ mt: 2, mb: 2, bgcolor: '#1a3d7c' }}>
            {loading ? 'Inscription...' : "S'inscrire"}
          </Button>
          <Typography align="center">
            Déjà un compte ? <Link to="/login" style={{ color: '#1a3d7c' }}>Se connecter</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterForm;