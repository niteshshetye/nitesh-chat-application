// IMPORT LIBRARY
import React, { useState } from "react";
import { Link } from "react-router-dom";

// IMPORT THE CSS
import "./Join.css";

// MAIN COMPONENT
const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            type="text"
            className="joinInput"
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="text"
            className="joinInput mt-20"
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Room"
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button type="submit" className="button mt-20">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
