import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../api/auth';
import { Container, Paper, TextField, Button, Typography, Box, Alert } from '@mui/material';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(formData);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion');
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
        <Typography variant="h6" align="center" gutterBottom>Connexion</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" name="email" type="email" value={formData.email}
            onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Mot de passe" name="password" type="password" value={formData.password}
            onChange={handleChange} margin="normal" required />
          <Button type="submit" fullWidth variant="contained" disabled={loading}
            sx={{ mt: 2, mb: 2, bgcolor: '#1a3d7c' }}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
          <Typography align="center">
            Pas de compte ? <Link to="/register" style={{ color: '#1a3d7c' }}>S'inscrire</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;