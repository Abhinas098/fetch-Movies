import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

let retry = null;
var intervals = [];
function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cancel, setCancel] = useState(true);

  const FetchMovieHandler = async () => {
    setError(null);
    setLoading(true);
    setMovies([]);
    try {
      const response = await fetch("https://swapi.dev/api/film/");
      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }
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
    } catch (error) {
      setError(error.message);

      if (cancel) {
        retry = setInterval(FetchMovieHandler, 5000);
        intervals.push(retry);
      }
    }
    setLoading(false);
  };

  function retryCancel() {
    setCancel(false);

    intervals.map((interval) => {
      console.log(interval);
      return clearInterval(interval);
    });
    setError(null);
    setCancel(true);
    return clearInterval(retry);
  }

  let content = "no data found";
  if (loading) {
    content = <h3>Loading...</h3>;
  }
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = (
      <div>
        <p>{error}</p> <button onClick={retryCancel}>Cancel</button>
      </div>
    );
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
