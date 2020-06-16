import React, { Component } from "react";

import "./style.css";
import Intro from "./intro";
import AudioRecord from "./useUserMedia";
import VideoAsk from "./videoAsk";
import VideoRecord from "./videoRecord";

export default class App extends Component {
  state = {
    isIntro: true,
    isPaused: false,
    isVideo: false,
    isAudio: false,
    isText: false,
  };

  render() {
    const { isIntro, isAudio, isVideo } = this.state;
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
          {!isIntro && isAudio && (
            <AudioRecord />
            /*<VideoAsk
              isAudio={this.state.isAudio}
              isVideo={this.state.isVideo}
            />*/
          )}
          {!isIntro && isVideo && (
            <VideoRecord />
            /*<VideoAsk
              isAudio={this.state.isAudio}
              isVideo={this.state.isVideo}
            />*/
          )}
        </div>
      </div>
    );
  }
}
