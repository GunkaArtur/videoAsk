import React, { useState } from "react";
import Sound from "react-sound";
import Button from "./Button";
import "./style.css";
//import RecordingCount from "./RecordingCount";

export default function AudioRecord() {
  const [title, setTitle] = useState("Record");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [playStatus, setPlayStatus] = useState(Sound.status.STOPPED);
  const [audio, setAudio] = useState(null);

  const startListening = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const newMediaRecorder = new MediaRecorder(stream);
        newMediaRecorder.start();
        let chunks = [];
        newMediaRecorder.ondataavailable = function (e) {
          chunks.push(e.data);
        };
        newMediaRecorder.onstop = function (e) {
          const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          const audioURL = window.URL.createObjectURL(blob);
          const audio = document.createElement("audio");
          audio.setAttribute("id", "player");
          audio.src = audioURL;
          setAudio(audio);
        };
        setMediaRecorder(newMediaRecorder);
      })
      .catch(function (err) {
        console.log("The following getUserMedia error occured: " + err);
      });
  };

  const record = async () => {
    navigator.permissions.query({ name: "microphone" }).then(function (result) {
      if (result.state !== "granted") {
        alert("Must allow microphone to record");
        navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {});
      }
    });
    await startListening();
    setTitle("Square");
    const button = document.querySelector(".button");
    button.classList.add("pulse");
  };

  const play = () => {
    setPlayStatus(Sound.status.PLAYING);
    setTitle("Play-Square");
  };

  const stop = () => {
    setTitle("Play");
    const button = document.querySelector(".button");
    button.classList.remove("pulse");
    button.classList.add("play");
    mediaRecorder.stop();
  };

  const reset = () => {
    setTitle("Record");
    const button = document.querySelector(".button");
    button.classList.remove("play");
    setPlayStatus(Sound.status.STOPPED);
  };

  const save = () => {
    // TODO: send to server
    setTitle("Record");
    const button = document.querySelector(".button");
    button.classList.remove("play");
    setPlayStatus(Sound.status.STOPPED);
  };

  const playStop = () => {
    setPlayStatus(Sound.status.STOPPED);
    setTitle("Play");
  };

  return (
    <div className="main-container">
      <Button
        title={title}
        record={record}
        play={play}
        stop={stop}
        audio={audio}
        playStop={playStop}
      />
      {title === "Play" ? (
        <div>
          <button className="redo-button" onClick={reset}>
            Redo
          </button>
          <button className="save-button" onClick={save}>
            Save
          </button>
        </div>
      ) : (
        <>
          {
            title === "Record" ? (
              <div className="sub-text">Tap the microphone to record</div>
            ) : null
            // <RecordingCount />
          }
        </>
      )}
      {audio ? (
        <>
          <Sound
            url={audio.src}
            onFinishedPlaying={playStop}
            playStatus={playStatus}
          />
        </>
      ) : null}
    </div>
  );
}

/*import { useState, useEffect } from "react";

export const useUserMedia = (constraints) => {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (stream) return;
    let didCancel = false;

    const getUserMedia = async () => {
      if (!didCancel) {
        try {
          setStream(await navigator.mediaDevices.getUserMedia(constraints));
        } catch (e) {
          setError(e);
        }
      }
    };
    const cancel = () => {
      didCancel = true;
      if (!stream) return;
      if (stream?.getVideoTracks) {
        stream.getVideoTracks().map((track) => track.stop());
      }
      if (stream?.getAudioTracks) {
        stream.getAudioTracks().map((track) => track.stop());
      }
      if (stream?.stop) {
        stream.stop();
      }
    };
    getUserMedia();
    return cancel;
  }, [constraints, stream, error]);
  return { stream, error };
};
*/
