// External Modules
import React, { Component } from "react";

// Styling
import "./homepage.scss";

// Internal Components
import TopBar from "./top-bar/topBar";
import ContentContainer from "./content-container/contentContainer";

class HomePage extends Component {
  render() {
    return (
      <div className="homepage-container">
        <TopBar />
        <ContentContainer />
      </div>
    );
  }
}

export default HomePage;
