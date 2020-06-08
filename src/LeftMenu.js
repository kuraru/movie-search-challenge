import React, { useState } from "react";
import "./LeftMenu.css";

const LeftMenu = () => {
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);

  const toggleVisible = () => {
    setVisible(visible ? false : true);
  };

  const selectOption = opt => {
    setSelectedOption(opt);
  };

  return (
    <div>
      {visible ? (
        <div className="DisplayedMenu" onMouseLeave={() => toggleVisible()}>
          <h2>Menu</h2>
          <h3>
            <a href="#" onClick={() => selectOption(1)}>
              Search movie
            </a>
          </h3>
        </div>
      ) : (
        <div className="HiddenMenu" onMouseEnter={() => toggleVisible()} />
      )}
    </div>
  );
};

export default LeftMenu;
