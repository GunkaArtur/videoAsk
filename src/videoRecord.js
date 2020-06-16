import React, { useState, useRef } from "react";
import Button from "./Button";
import "./style.css";

export default function VideoRecord() {
  const [title, setTitle] = useState("Record");
  const vidEl = useRef(null);
  const vidEl2 = useRef(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [video, setVideo] = useState(null);

  const startListening = async () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: { width: 360, height: 630, facingMode: "user" },
      })
      .then((stream) => {
        vidEl2.current.srcObject = stream;
        const newMediaRecorder = new MediaRecorder(stream);
        newMediaRecorder.start();
        let chunks = [];
        newMediaRecorder.ondataavailable = function (e) {
          chunks.push(e.data);
        };
        newMediaRecorder.onstop = function (e) {
          const blob = new Blob(chunks, { type: "video/mp4;" });
          const videoURL = window.URL.createObjectURL(blob);
          setVideo(videoURL);
        };
        setMediaRecorder(newMediaRecorder);
      })
      .catch(function (err) {
        console.log("The following getUserMedia error occured: " + err);
      });
  };

  const record = async () => {
    navigator.permissions.query({ name: "camera" }).then(function (result) {
      if (result.state !== "granted") {
        alert("Must allow camera to record");
        navigator.mediaDevices
          .getUserMedia({
            audio: true,
            video: { width: 360, height: 630, facingMode: "user" },
          })
          .then(() => {});
      }
    });
    await startListening();
    setTitle("Square");
    const button = document.querySelector(".button");
    button.classList.add("pulse");
  };

  const play = () => {
    setTitle("Play-Square");
    console.log("vidEl", vidEl);
    vidEl.current.play();
  };

  const stop = () => {
    setTitle("Play");
    const button = document.querySelector(".button");
    button.classList.remove("pulse");
    button.classList.add("play");
    mediaRecorder.stop();
    const mediaStream = vidEl2.current.srcObject;
    const tracks = mediaStream.getTracks();
    tracks.forEach((track) => track.stop());
  };

  const playStop = () => {
    setTitle("Play");
  };

  return (
    <div className="main-container">
      {(title === "Square" || title === "Record") && (
        <video autoPlay ref={vidEl2} />
      )}
      {video && (
        <>
          <video ref={vidEl} src={video} autoPlay />
        </>
      )}

      <Button
        title={title}
        record={record}
        play={play}
        stop={stop}
        video={video}
        playStop={playStop}
      />
    </div>
  );
}
