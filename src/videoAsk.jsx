/*import React from "react";
import { useUserMedia } from "./videoRecord";

const VideoAsk = ({ isAudio, isVideo }) => {
  const { stream, error } = useUserMedia({
    audio: isAudio,
    video: isVideo ? { width: 360, height: 630, facingMode: "user" } : false,
  });
  if (error) {
    return <p>Error</p>;
  }

  const handleStop = () => {
    console.log("stop");
  };
  return (
    <>
      <video
        autoPlay
        ref={(video) => {
          if (video) {
            video.srcObject = stream;
          }
        }}
      />
      <button className="play-button" onClick={handleStop}>
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
    </>
  );
};

export default VideoAsk;
*/
