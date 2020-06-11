import React, { useState } from "react";
import { useUserMedia } from "./useUserMedia";
import "./style.css";

function App() {
  console.log("It works");
  const [isIntro, setIsIntro] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const { stream, error } = useUserMedia({
    audio: isAudio,
    video: isVideo ? { width: 360, height: 630, facingMode: "user" } : false,
  });
  console.log(
    `isIntro: ${isIntro} isPaused: ${isPaused} isVideo: ${isVideo} isAudio: ${isAudio}`
  );

  const handleVideoClick = () => {
    console.log("handleVideoClick");
    setIsIntro(false);
    setIsVideo(true);
    setIsAudio(true);
  };
  const handleAudioClick = () => {
    console.log("handleAudioClick");
    setIsIntro(false);
    setIsAudio(true);
  };
  const handleTextClick = () => {
    console.log("handleTextClick");
  };
  const onPlayClick = () => {
    console.log("play-button click");
    if (isPaused) {
      //play
      _video.play();
      setIsPaused(false);
    } else if (!isPaused) {
      //pause
      _video.pause();
      setIsPaused(true);
    }
  };
  // if (!isIntro && error) {
  //   return <p>error</p>;
  // }
  let _video;

  return (
    <div>
      <h1>Hey you!</h1>
      <div className="container">
        {isIntro && (
          <>
            <video
              autoPlay
              src={
                "https://media.videoask.com/transcoded/bb83352e-903a-436e-a35b-97b8dada86e3/video.mp4"
              }
              ref={(video) => (_video = video)}
              // onLoadStart={this.onLoadStart}
              // onTimeUpdate={this.onProgress}
            />
            <button className="play-button" onClick={onPlayClick}>
              <svg fill="none" height="96" width="96">
                <path
                  clip-rule="evenodd"
                  d="M48 96c26.51 0 48-21.49 48-48S74.51 0 48 0 0 21.49 0 48s21.49 48 48 48z"
                  fill="#fff"
                  fill-rule="evenodd"
                ></path>
                <path
                  clip-rule="evenodd"
                  d="M37.326 33.822c0-2.408 2.695-3.835 4.687-2.481l20.862 14.178c1.752 1.19 1.752 3.772 0 4.963L42.013 64.66c-1.992 1.354-4.687-.072-4.687-2.48V33.821z"
                  fill="#000"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
          </>
        )}
        {!isIntro && (
          <video
            autoPlay
            ref={(video) => {
              if (video) {
                video.srcObject = stream;
              }
            }}
          />
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
      </div>
    </div>
  );
}

export default App;
