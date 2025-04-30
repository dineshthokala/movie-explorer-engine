import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Typography, Box, Paper, Grid } from '@mui/material';

function Auth({ onAuthSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Login successful!');
        onAuthSuccess();
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Signup successful!');
        onAuthSuccess();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Grid item xs={11} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '32px', borderRadius: '12px' }}>
          <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold', color: '#1976d2' }}>
            {isLogin ? 'Welcome Back!' : 'Create an Account'}
          </Typography>
          <Typography variant="body1" align="center" gutterBottom style={{ color: '#757575' }}>
            {isLogin ? 'Login to continue exploring movies' : 'Sign up to start your journey'}
          </Typography>
          <Box component="form" noValidate autoComplete="off" style={{ marginTop: '16px' }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAuth}
              style={{ marginTop: '16px', padding: '12px', fontWeight: 'bold' }}
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
            <Button
              variant="text"
              fullWidth
              onClick={() => setIsLogin(!isLogin)}
              style={{ marginTop: '8px', color: '#1976d2', fontWeight: 'bold' }}
            >
              {isLogin ? 'Don’t have an account? Sign Up' : 'Already have an account? Login'}
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Auth;