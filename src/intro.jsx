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
                <svg fill="none" height="24" width="27">
                  <rect height="16" rx="3" width="18" y="4"></rect>
                  <path
                    clipRule="evenodd"
                    d="M20 10.425a1 1 0 01.563-.899l5-2.432a1 1 0 011.437.9v8.012a1 1 0 01-1.413.91l-5-2.264a1 1 0 01-.587-.91v-3.317z"
                  ></path>
                </svg>
                video
              </button>
              <button className="answer-option" onClick={handleAudioClick}>
                <svg height="24" width="27">
                  <path
                    clipRule="evenodd"
                    d="M14 0a4 4 0 00-4 4v8a4 4 0 008 0V4a4 4 0 00-4-4zM6 8.846a.847.847 0 011.696 0v3.33c0 3.476 2.822 6.293 6.304 6.293s6.304-2.817 6.304-6.293v-3.33a.847.847 0 011.696 0v3.33a7.991 7.991 0 01-7.152 7.93v2.2h2.657a.847.847 0 110 1.694h-7.01a.847.847 0 110-1.693h2.657v-2.201A7.991 7.991 0 016 12.176v-3.33z"
                    fillRule="evenodd"
                  ></path>
                </svg>
                audio
              </button>
              <button className="answer-option" onClick={handleTextClick}>
                <svg height="24" width="27">
                  <path
                    clipRule="evenodd"
                    d="M6 3a2 2 0 00-2 2v15a2 2 0 002 2h15a2 2 0 002-2V5a2 2 0 00-2-2H6zm6.252 12.993h-1.264V18h5.224v-2.007h-1.288V8.837h1.682v1.436h2.64V6.896h-11.1v3.377h2.625V8.837h1.48v7.156z"
                    fillRule="evenodd"
                  ></path>
                </svg>
                text
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}
