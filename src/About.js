import React from "react";
import "./About.css";
import CopyrightIcon from "@material-ui/icons/Copyright";

// Basic About page
// TODO: Check routing
export default function About() {
  return (
    <div className="MainDiv">
      <h2>Movie Searcher by Luis Rodriguez</h2>
      <h3>
        Jun 2020 <CopyrightIcon color="primary" fontSize="small" />
      </h3>
    </div>
  );
}
