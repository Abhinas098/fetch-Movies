import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false)

  const FetchMovieHandler = async () => {
    setLoading(true)
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();
    
    const transformedMovies = data.results.map((movie) => {
      return {
        id: movie.episode_id,
        title: movie.title,
        openingText: movie.opening_crawl,
        releaseDate: movie.release_date,
      };
    });
    setMovies(transformedMovies);
    setLoading(false)
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!loading && <MoviesList movies={movies} />}
        {loading && <p>Loading.....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
