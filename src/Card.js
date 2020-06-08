import React from "react";

const Card = props => {
  var { original_title, overview, poster, release_date } = props;
  return (
    <div>
      <img src={poster} alt="Poster" />
      <h2>{original_title}</h2>
      <div>{release_date}</div>
      <div>{overview}</div>
      <div>{poster}</div>
    </div>
  );
};

export default Card;
