import React from "react";
import "./Card.css";

// Card element to show each movie
// There are two forms of this card,
// one) noraml operation is when it shows a movie in the list
// two) when a card is clicked it shows the same but with no click function
//      and with a couple of buttons in the bottom
const Card = props => {
  var {
    original_title,
    overview,
    poster,
    release_date,
    onClick,
    id,
    showButtons,
    rate
  } = props;
  return (
    <div onClick={() => onClick(id)}>
      <div className="row">
        <div className="emptyColumn">&nbsp;</div>
        <div className="columnLeft">
          <img src={poster} alt="Poster" />
        </div>
        <div className="columnRight">
          <div className="row">
            <div className="titleLeft">
              <h2>{original_title}</h2>
            </div>
            <div className="titleRight">
              <input
                className="buttonRate"
                type="Button"
                value={rate}
                onClick={() => null}
              />
            </div>
          </div>
          <div className="justifyLeft">
            <p>{release_date}</p>
          </div>
          <div className="justifyLeft">
            <p>{overview}</p>
          </div>
        </div>
      </div>
      {showButtons ? (
        <div className="row">
          <div className="columnButton">
            <input
              className="roundedBlackButton"
              type="Button"
              value="Watch Online"
              onClick={() => null}
            />
          </div>
          <div className="columnButton">
            <input
              className="roundedButton"
              type="Button"
              value="Watch Offline"
              onClick={() => null}
            />
          </div>
          <div className="columnButton" />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Card;
