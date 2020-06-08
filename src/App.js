import React from "react";
import "./styles.css";
import LeftMenu from "./LeftMenu";
import Searcher from "./Searcher";

export default function App() {
  return (
    <div className="App">
      <LeftMenu />
      <Searcher />
    </div>
  );
}
