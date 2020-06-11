import React, { useState } from "react";
import { useUserMedia } from "./useUserMedia";
import "./style.css";

function App() {
  console.log("It works");
  const [isIntro, setIsIntro] = useState(true);
  const [isVideo, setIsVideo] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const { stream, error } = useUserMedia({
    audio: isAudio,
    video: isVideo ? { width: 360, height: 630, facingMode: "user" } : false,
  });

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
  // if (!isIntro && error) {
  //   return <p>error</p>;
  // }

  return (
    <div>
      <h1>Hey you!</h1>
      <div className="container">
        {isIntro && (
          <video
            autoPlay
            src={
              "https://media.videoask.com/transcoded/bb83352e-903a-436e-a35b-97b8dada86e3/video.mp4"
            }
            // ref={(video) => (this._video = video)}
            // onLoadStart={this.onLoadStart}
            // onTimeUpdate={this.onProgress}
          />
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
