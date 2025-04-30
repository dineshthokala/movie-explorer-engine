import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieSection from '../components/MovieSection';
import { Select, MenuItem, FormControl, InputLabel, Box, Typography, TextField, Pagination } from '@mui/material';

function Home() {
  const [movies, setMovies] = useState({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: []
  });
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = 'a2f9adf20da9570c64934a8092813acb';
      const endpoints = {
        nowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`,
        popular: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`,
        topRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${page}`,
        upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=${page}`
      };

      const responses = await Promise.all(
        Object.keys(endpoints).map(key => axios.get(endpoints[key]))
      );

      setMovies({
        nowPlaying: responses[0].data.results,
        popular: responses[1].data.results,
        topRated: responses[2].data.results,
        upcoming: responses[3].data.results
      });
    };

    const fetchGenres = async () => {
      const apiKey = 'a2f9adf20da9570c64934a8092813acb';
      const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
      setGenres(response.data.genres);
    };

    fetchMovies();
    fetchGenres();
  }, [page]);

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      const myList = JSON.parse(localStorage.getItem('myList')) || [];
      if (myList.length === 0) return;

      const apiKey = 'a2f9adf20da9570c64934a8092813acb';
      const genreIds = myList.flatMap(movie => movie.genre_ids || []);
      const uniqueGenreIds = [...new Set(genreIds)];

      const responses = await Promise.all(
        uniqueGenreIds.map(genreId =>
          axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`)
        )
      );

      const movies = responses.flatMap(response => response.data.results);
      setRecommendedMovies(movies.slice(0, 10)); // Limit to 10 recommendations
    };

    fetchRecommendedMovies();
  }, []);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filterMoviesByGenre = (movies) => {
    if (!selectedGenre) return movies;
    return movies.filter(movie => movie.genre_ids.includes(parseInt(selectedGenre)));
  };

  const filterMoviesBySearch = (movies) => {
    if (!searchQuery) return movies;
    return movies.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const sortMovies = (movies) => {
    if (!sortOption) return movies;
    return [...movies].sort((a, b) => {
      if (sortOption === 'rating') return b.vote_average - a.vote_average;
      if (sortOption === 'year') return new Date(b.release_date) - new Date(a.release_date);
      if (sortOption === 'runtime') return b.runtime - a.runtime;
      return 0;
    });
  };

  const processMovies = (movies) => {
    return filterMoviesBySearch(sortMovies(filterMoviesByGenre(movies)));
  };

  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h4" gutterBottom>Discover Movies</Typography>
      <Box display="flex" gap={2} marginBottom={2}>
        <TextField
          label="Search Movies"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <FormControl fullWidth>
          <InputLabel id="genre-select-label">Filter by Genre</InputLabel>
          <Select
            labelId="genre-select-label"
            value={selectedGenre}
            onChange={handleGenreChange}
          >
            <MenuItem value="">All Genres</MenuItem>
            {genres.map(genre => (
              <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="sort-select-label">Sort by</InputLabel>
          <Select
            labelId="sort-select-label"
            value={sortOption}
            onChange={handleSortChange}
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="year">Year</MenuItem>
            <MenuItem value="runtime">Runtime</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <MovieSection title="Now Playing" movies={processMovies(movies.nowPlaying)} />
      <MovieSection title="Popular" movies={processMovies(movies.popular)} />
      <MovieSection title="Top Rated" movies={processMovies(movies.topRated)} />
      <MovieSection title="Upcoming" movies={processMovies(movies.upcoming)} />

      {recommendedMovies.length > 0 && (
        <MovieSection title="Recommended for You" movies={recommendedMovies} />
      )}

      <Pagination
        count={10} // Adjust this based on the total number of pages available from the API
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
}

export default Home;