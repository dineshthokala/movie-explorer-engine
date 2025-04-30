# Movie Explorer

Movie Explorer is a React-based web application that allows users to explore movies, view details, and manage a personalized list of favorite movies. The app integrates with The Movie Database (TMDb) API to fetch movie data and Firebase for user authentication.

## Features

- **Discover Movies**: Browse movies by categories such as Now Playing, Popular, Top Rated, and Upcoming.
- **Search and Filter**: Search for movies by title, filter by genre, and sort by rating, release year, or runtime.
- **Movie Details**: View detailed information about a movie, including its cast, director, trailer, and similar movies.
- **My List**: Add or remove movies from a personalized list stored in local storage.
- **User Authentication**: Sign up and log in using Firebase Authentication.
- **Dark Mode**: Toggle between light and dark themes.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd movie-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/`
  - `App.js`: Main application component.
  - `index.js`: Entry point of the application.
  - `components/`: Reusable UI components like `Sidebar`, `MovieSection`, and `ThreeScene`.
  - `pages/`: Page components for different routes such as `Home`, `MyList`, `MovieDetails`, and `Auth`.
  - `firebaseConfig.js`: Firebase configuration and initialization.
  - `App.css` and `index.css`: Global styles.
- `public/`
  - Static assets like `index.html`, `manifest.json`, and icons.

## API Integration

The app uses [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api) to fetch movie data. Replace the `apiKey` in the code with your own TMDb API key.

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Replace the `firebaseConfig` object in `src/firebaseConfig.js` with your Firebase project credentials.

## Available Scripts

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.

## Dependencies

- React
- Material-UI
- Firebase
- Axios
- Framer Motion
- React Router DOM

## License

This project is licensed under the MIT License. See the LICENSE file for details.

