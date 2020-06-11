import React, { Component } from "react";
import "./style.css";

export default class Intro extends Component {
  state = {
    isIntro: true,
    isPaused: false,
  };

  render() {
    const { handleVideoClick, handleAudioClick, handleTextClick } = this.props;
    const { isIntro, isPaused } = this.state;
    console.log("It works");
    const onPlayClick = () => {
      const { isPaused } = this.state;
      console.log("play-button click");
      _video.pause();

      if (isPaused) {
        _video.play();
        this.setState({ isPaused: false });
      } else if (!isPaused) {
        _video.pause();
        this.setState({ isPaused: true });
      }
    };

    let _video;

    return (
      <>
        <video
          autoPlay
          onClick={onPlayClick}
          src={
            "https://media.videoask.com/transcoded/bb83352e-903a-436e-a35b-97b8dada86e3/video.mp4"
          }
          ref={(video) => (_video = video)}
        />
        {isIntro && isPaused && (
          <button className="play-button" onClick={onPlayClick}>
            <svg fill="none" height="96" width="96">
              <path
                d="M48 96c26.51 0 48-21.49 48-48S74.51 0 48 0 0 21.49 0 48s21.49 48 48 48z"
                fill="#fff"
                fillRule="evenodd"
              ></path>
              <path
                d="M37.326 33.822c0-2.408 2.695-3.835 4.687-2.481l20.862 14.178c1.752 1.19 1.752 3.772 0 4.963L42.013 64.66c-1.992 1.354-4.687-.072-4.687-2.48V33.821z"
                fill="#000"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        )}
        {isIntro && (
          <div className="interactive">
            <h6>How would you like to answer?</h6>
            <div className="options">
              <button className="answer-option" onClick={handleVideoClick}>
                video
              </button>
              <button className="answer-option" onClick={handleAudioClick}>
                audio
              </button>
              <button className="answer-option" onClick={handleTextClick}>
                text
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}
