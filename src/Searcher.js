import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const Searcher = () => {
  const [data, setData] = useState({ results: [] });
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState({ genres: [] });
  const [genreSelected, setGenreSelected] = useState(1000000);

  useEffect(() => {
    var loadGenres = async () => {
      var genres = [{ value: 1000000, label: "All" }];
      const result = await axios(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=344882174a9fa0bcf4e7985fd9f9d9e7&language=en-US"
      );

      result.data.genres.map(item =>
        genres.push({ value: item.id, label: item.name })
      );
      console.log(genres);
      setGenres({ genres: genres });
    };

    loadGenres();
  }, []);

  const search = async event => {
    setLoading(true);

    var results = [];
    var url =
      "https://api.themoviedb.org/3/search/movie?api_key=344882174a9fa0bcf4e7985fd9f9d9e7&language=en-US&query=";
    var urlWithParms =
      url +
      encodeURIComponent(event.target.value) +
      "&page=1&include_adult=false";

    console.log(urlWithParms);

    var result = await axios.get(urlWithParms);
    console.log(result.data);
    //console.log(result.data.results[0].original_title)

    result.data.results.map(item => results.push(item));

    setData({ results: results });
    setLoading(false);
  };

  const createElement = item => {
    //console.log(item.original_title + " " + item.id)
    //console.log(item.genre_ids, genreSelected)
    //console.log(item.genre_ids.includes(genreSelected))
    if (genreSelected === 1000000 || item.genre_ids.includes(genreSelected)) {
      return (
        <li key={item.id}>
          <Card
            original_title={item.original_title}
            release_date={item.release_date}
            overview={item.overview}
            poster={"http://image.tmdb.org/t/p/w185/" + item.poster_path}
          />
        </li>
      );
    }
  };

  const createList = data => {
    console.log(data);
    if (typeof data !== "undefined") {
      return <ul>{data.map(item => createElement(item))}</ul>;
    }
  };

  const stateGenre = event => {
    console.log(event.target.value);
    setGenreSelected(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <div>
        <h1>Movie Searcher</h1>
        <p>Movie title:</p>
        <input type="text" onChange={event => search(event)} />
        <p>Genres</p>
        <select onChange={event => stateGenre(event)}>
          {genres.genres.map(item => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        {loading ? <p> Loading data</p> : <ui>{createList(data.results)}</ui>}
      </div>
    </div>
  );
};

export default Searcher;
