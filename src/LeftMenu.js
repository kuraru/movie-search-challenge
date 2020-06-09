import React, { useState } from "react";
import "./LeftMenu.css";
import MenuIcon from "@material-ui/icons/Menu";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SearchIcon from "@material-ui/icons/Search";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import AddIcon from "@material-ui/icons/Add";
import { BrowserRouter as Router, Link } from "react-router-dom";

// Basic self hidden Menu
// TODO: check routing
const LeftMenu = () => {
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);

  // toggle functions to show and hide the menu
  // note that it shows on mouseover and hids when mouse left the area
  const toggleVisible = () => {
    setVisible(visible ? false : true);
  };

  const selectOption = opt => {
    setSelectedOption(opt);
  };

  return (
    <div>
      {visible ? (
        <Router>
          <div className="DisplayedMenu" onMouseLeave={() => toggleVisible()}>
            <MenuIcon color="primary" fontSize="small" />
            <h2>Menu</h2>
            <KeyboardArrowDownIcon color="primary" fontSize="small" />
            <h3>
              <Link to="/Searcher">
                Search movie{" "}
                {selectOption === 1 ? (
                  <FastfoodIcon color="primary" fontSize="small" />
                ) : (
                  <p>&nbsp;</p>
                )}
                <SearchIcon color="primary" fontSize="small" />
              </Link>
            </h3>
            <h3>
              <Link to="/About">
                About this App{" "}
                {selectOption === 2 ? (
                  <FastfoodIcon color="primary" fontSize="small" />
                ) : (
                  <p>&nbsp;</p>
                )}
                <AddIcon color="primary" fontSize="small" />
              </Link>
            </h3>
          </div>
        </Router>
      ) : (
        <div className="HiddenMenu" onMouseEnter={() => toggleVisible()}>
          <MenuIcon color="primary" fontSize="small" />
        </div>
      )}
    </div>
  );
};

export default LeftMenu;
