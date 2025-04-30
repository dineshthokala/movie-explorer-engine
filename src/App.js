import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Home from './pages/Home';
import MyList from './pages/MyList';
import MovieDetails from './pages/MovieDetails';
import Sidebar from './components/Sidebar';
import Auth from './pages/Auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#ff4081',
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  });

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ display: 'flex', height: '100vh' }}>
          {isAuthenticated && <Sidebar />}
          <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
            <IconButton
              onClick={toggleDarkMode}
              style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '50%' }}
              color="inherit"
            >
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <Routes>
              {!isAuthenticated ? (
                <Route path="/*" element={<Auth onAuthSuccess={handleAuthSuccess} />} />
              ) : (
                <>
                  <Route path="/" element={<Navigate to="/discover" />} />
                  <Route path="/discover" element={<Home />} />
                  <Route path="/my-list" element={<MyList />} />
                  <Route path="/movie/:id" element={<MovieDetails />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
