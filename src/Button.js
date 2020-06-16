import React from "react";

import "./style.css";

export default function Button({ title, record, play, stop, playStop }) {
  switch (title) {
    case "Square": {
      return (
        <div onClick={stop}>
          <span className="button">stop</span>
        </div>
      );
    }
    case "Play": {
      return (
        <div onClick={play}>
          <span className="button">play</span>
        </div>
      );
    }
    case "Play-Square": {
      return (
        <div onClick={playStop}>
          <span className="button">play-square</span>
        </div>
      );
    }
    default: {
      return (
        <div onClick={record}>
          <span className="button">mic</span>
        </div>
      );
    }
  }
}
