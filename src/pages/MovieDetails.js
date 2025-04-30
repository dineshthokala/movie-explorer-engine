import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState('');
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isInMyList, setIsInMyList] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiKey = 'a2f9adf20da9570c64934a8092813acb';
      const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
      setMovie(movieResponse.data);

      const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`);
      setCast(creditsResponse.data.cast.slice(0, 5));
      const directorData = creditsResponse.data.crew.find(member => member.job === 'Director');
      setDirector(directorData ? directorData.name : 'Unknown');

      const similarResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`);
      setSimilarMovies(similarResponse.data.results);

      const videosResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`);
      const trailer = videosResponse.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailer) {
        setTrailerKey(trailer.key);
      }

      const myList = JSON.parse(localStorage.getItem('myList')) || [];
      setIsInMyList(myList.some(movie => movie.id === parseInt(id)));
    };

    fetchMovieDetails();
  }, [id]);

  const handleMyListToggle = () => {
    const myList = JSON.parse(localStorage.getItem('myList')) || [];
    if (isInMyList) {
      const updatedList = myList.filter(movie => movie.id !== parseInt(id));
      localStorage.setItem('myList', JSON.stringify(updatedList));
    } else {
      myList.push({ id: movie.id, title: movie.title });
      localStorage.setItem('myList', JSON.stringify(myList));
    }
    setIsInMyList(!isInMyList);
  };

  if (!movie) return <Typography variant="h6">Loading...</Typography>;

  return (
    <div style={{ padding: '16px' }}>
      <Card>
        <CardMedia
          component="img"
          height="500"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>{movie.title}</Typography>
          <Typography variant="body1" paragraph>{movie.overview}</Typography>
          <Typography variant="body2">Release Date: {movie.release_date}</Typography>
          <Typography variant="body2">Rating: {movie.vote_average}</Typography>
          <Typography variant="body2">Director: {director}</Typography>
          <Typography variant="body2">Cast: {cast.map(member => member.name).join(', ')}</Typography>
          <Button variant="contained" color="primary" onClick={handleMyListToggle} style={{ marginTop: '16px' }}>
            {isInMyList ? 'Remove from My List' : 'Add to My List'}
          </Button>
        </CardContent>
      </Card>

      {trailerKey && (
        <div style={{ marginTop: '32px' }}>
          <Typography variant="h5" gutterBottom>Trailer</Typography>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <div style={{ marginTop: '32px' }}>
        <Typography variant="h5" gutterBottom>Similar Movies</Typography>
        <Grid container spacing={2}>
          {similarMovies.map(similar => (
            <Grid item xs={12} sm={6} md={3} key={similar.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={`https://image.tmdb.org/t/p/w500${similar.poster_path}`}
                  alt={similar.title}
                />
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>{similar.title}</Typography>
                  <Typography variant="body2" color="text.secondary">Rating: {similar.vote_average}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default MovieDetails;