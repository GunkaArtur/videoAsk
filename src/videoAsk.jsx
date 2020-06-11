import React from "react";
import { useUserMedia } from "./useUserMedia";

const VideoAsk = ({ isAudio, isVideo }) => {
  const { stream, error } = useUserMedia({
    audio: isAudio,
    video: isVideo ? { width: 360, height: 630, facingMode: "user" } : false,
  });
  if (error) {
    return <p>Error</p>;
  }
  return (
    <video
      autoPlay
      ref={(video) => {
        if (video) {
          video.srcObject = stream;
        }
      }}
    />
  );
};

export default VideoAsk;
