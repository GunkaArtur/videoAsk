import React, { Component } from "react";

import "./style.css";
import Intro from "./intro";
import VideoAsk from "./videoAsk";

export default class App extends Component {
  state = {
    isIntro: true,
    isPaused: false,
    isVideo: false,
    isAudio: false,
    isText: false,
  };

  render() {
    const { isIntro } = this.state;
    console.log("It works");

    const handleVideoClick = () => {
      console.log("handleVideoClick");
      this.setState({ isVideo: true });
      this.setState({ isIntro: false });
    };
    const handleAudioClick = () => {
      console.log("handleAudioClick");
      this.setState({ isAudio: true });
      this.setState({ isIntro: false });
    };
    const handleTextClick = () => {
      console.log("handleTextClick");
      this.setState({ isAudio: true });
      this.setState({ isIntro: false });
    };

    return (
      <div>
        <h1>Hey you!</h1>
        <div className="container">
          {isIntro && (
            <Intro
              handleVideoClick={handleVideoClick}
              handleAudioClick={handleAudioClick}
              handleTextClick={handleTextClick}
            />
          )}
          {!isIntro && (
            <VideoAsk
              isAudio={this.state.isAudio}
              isVideo={this.state.isVideo}
            />
          )}
        </div>
      </div>
    );
  }
}
