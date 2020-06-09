import React, { useState, useEffect } from "react";
import "./Searcher.css";
import axios from "axios";
import Card from "./Card";
import Dialog from "@material-ui/core/Dialog";

// This is the main component, it searches for the movies based on the user imput
// using themoviedb API
// Also this component needs of Card.js that is the element that shows the movie info
const Searcher = () => {
  const [data, setData] = useState({ results: [] });
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState({ genres: [] });
  const [genreSelected, setGenreSelected] = useState(1000000);
  const [showModal, setShowModal] = useState(false);
  const [modalChildren, setModalChildren] = useState(<div />);
  const baseUrl =
    "https://api.themoviedb.org/3/search/movie?api_key=344882174a9fa0bcf4e7985fd9f9d9e7&language=en-US&query=";
  const endingUrl = "&page=1&include_adult=false";
  const genresUrl =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=344882174a9fa0bcf4e7985fd9f9d9e7&language=en-US";
  const baseImgUrl = "http://image.tmdb.org/t/p/w185/";

  useEffect(() => {
    var loadGenres = async () => {
      var genres = [{ value: 1000000, label: "All" }];
      const result = await axios(genresUrl);

      result.data.genres.map(item =>
        genres.push({ value: item.id, label: item.name })
      );
      console.log(genres);
      setGenres({ genres: genres });
    };

    loadGenres();
  }, []);

  // search for the movies based on the user input in "movie title" box
  const search = async event => {
    setLoading(true);

    var searchQuery = event.target.value;
    var results = [];

    // search only if there is any keyword to look for
    if (searchQuery && searchQuery !== "") {
      var urlWithParms = baseUrl + encodeURIComponent(searchQuery) + endingUrl;
      console.log(urlWithParms);

      var result = await axios.get(urlWithParms);
      console.log(result.data);
      //console.log(result.data.results[0].original_title)

      result.data.results.map(item => results.push(item));
    }
    setData({ results: results });
    setLoading(false);
  };

  // Creates the Card for each movie returned
  const createElement = item => {
    //console.log(item.original_title + " " + item.id)
    //console.log(item.genre_ids, genreSelected)
    //console.log(item.genre_ids.includes(genreSelected))

    // include the card only if it has the same genre (if any) selected
    if (genreSelected === 1000000 || item.genre_ids.includes(genreSelected)) {
      return (
        <li key={item.id} id={item.id}>
          <Card
            original_title={item.original_title}
            release_date={item.release_date}
            overview={item.overview}
            poster={baseImgUrl + item.poster_path}
            rate={item.popularity}
            id={item.id}
            onClick={() => displayModal(item.id)}
          />
        </li>
      );
    }
  };

  // main entry for creating the cards
  const createList = data => {
    console.log(data);
    if (typeof data !== "undefined") {
      return data.map(item => createElement(item));
    }
  };

  const stateGenre = event => {
    console.log(event.target.value);
    setGenreSelected(parseInt(event.target.value, 10));
  };

  // hide and show funtions for the Modal window
  const hideModal = e => {
    console.log("closing modal...", e);
    setShowModal(false);
    console.log("showModal:", showModal);
  };

  const displayModal = id => {
    // in this case we need the id from the list to know what info send
    // to the card
    console.log("id:", id);
    var pos = data.results.findIndex((item, index) => {
      console.log("item:", item);
      return item.id === id ? true : false;
    });
    if (pos !== -1) {
      var itemFound = data.results[pos];
      console.log("pos:", pos, " item:", itemFound);
      // don't forget not sending any onClick event anb tell it to
      // show the buttons
      setModalChildren(
        <div>
          <Card
            original_title={itemFound.original_title}
            release_date={itemFound.release_date}
            overview={itemFound.overview}
            poster={baseImgUrl + itemFound.poster_path}
            id={itemFound.id}
            rate={itemFound.popularity}
            onClick={() => null}
            showButtons={true}
          />
        </div>
      );
      setShowModal(true);
    }
  };

  return (
    <div className="MainDiv">
      <div className="MainColumn">
        <Dialog onClose={() => hideModal()} open={showModal}>
          {modalChildren}
        </Dialog>
        {loading ? (
          <p> Loading data</p>
        ) : (
          <ui className="CardList">{createList(data.results)}</ui>
        )}
      </div>
      <div className="RightColumn">
        <h3>Movie title:</h3>
        <input type="text" onChange={event => search(event)} />
        <h3>Genres:</h3>
        <select onChange={event => stateGenre(event)}>
          {genres.genres.map(item => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Searcher;
