import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  const deletemovieHandler = async () => {
    const deleteMethod = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await fetch(
      `https://react-http-db-df5cd-default-rtdb.firebaseio.com/movies/${props.id}.json`,
      deleteMethod
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={deletemovieHandler}>delete</button>
    </li>
  );
};

export default Movie;
