import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Card, CardContent, Typography } from '@mui/material';

function MyList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('myList')) || [];
    setMovies(savedMovies);
  }, []);

  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h4" gutterBottom>My List</Typography>
      {movies.length > 0 ? (
        <List>
          {movies.map((movie) => (
            <ListItem key={movie.id}>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant="h6">{movie.title}</Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No movies in your list.</Typography>
      )}
    </div>
  );
}

export default MyList;