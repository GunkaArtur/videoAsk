import React, { Component } from "react";
import Button from "./Button";
import "./style.css";

export default class VideoRecord extends Component {
  constructor(props) {
    super(props);
    this.vidEl = React.createRef();
    this.vidEl2 = React.createRef();
    this.state = {
      title: "Record",
      mediaRecorder: null,
      video: null,
    };
  }

  componentDidMount() {
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
    this.startListening();
  }

  startListening = async () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: { width: 360, height: 630, facingMode: "user" },
      })
      .then((stream) => {
        this.vidEl2.current.srcObject = stream;
      })
      .catch(function (err) {
        console.log("The following getUserMedia error occured: " + err);
      });
  };

  render() {
    const { title, video } = this.state;

    const record = async () => {
      const stream = this.vidEl2.current.srcObject;
      const newMediaRecorder = new MediaRecorder(stream);
      newMediaRecorder.start();
      let chunks = [];
      newMediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
      };
      newMediaRecorder.onstop = (e) => {
        const blob = new Blob(chunks, { type: "video/mp4;" });
        const videoURL = window.URL.createObjectURL(blob);
        this.setState({ video: videoURL });
      };
      this.setState({ mediaRecorder: newMediaRecorder });
      this.setState({ title: "Square" });
      const button = document.querySelector(".button");
      button.classList.add("pulse");
    };

    const play = () => {
      this.setState({ title: "Play-Square" });
      this.vidEl.current.play();
    };

    const playStop = () => {
      this.setState({ title: "Play" });
      this.vidEl.current.pause();
    };

    const stop = () => {
      this.setState({ title: "Play" });
      const button = document.querySelector(".button");
      button.classList.remove("pulse");
      button.classList.add("play");
      this.state.mediaRecorder.stop();
      const mediaStream = this.vidEl2.current.srcObject;
      const tracks = mediaStream.getTracks();
      tracks.forEach((track) => track.stop());
    };

    return (
      <div className="main-container">
        {(title === "Square" || title === "Record") && (
          <video autoPlay ref={this.vidEl2} />
        )}
        {video && (
          <>
            <video ref={this.vidEl} src={video} autoPlay />
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
}
