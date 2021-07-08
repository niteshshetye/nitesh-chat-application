// IMPORT LIBRARY
import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

// IMPORT THE COMPONENT
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";
// IMPORT CSS
import "./Chat.css";

// VARIABLES
let socket;

const Chat = ({ location }) => {
  // STATE DEFINE HERE
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  //  VARIABLES
  const ENDPOINT = "https://chat-nitesh-application.herokuapp.com/";
  // COMPONENT LIFE CYCLE
  useEffect(() => {
    // const data = queryString.parse(location.search);
    const { name, room } = queryString.parse(location.search);

    setName(name);
    setRoom(room);

    socket = io(ENDPOINT);

    socket.emit("join", { name, room }, () => {});

    // WHEN THE COMPONENT IS UNMOUNTED IT CALLS BASICALLY WHEN USER LEFT THT CHAT
    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  // WHEN NEW MESSAGE ARRIVED EACH TIME RUN
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  // FUNCTION FOR SENDING MESSAGE
  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  // console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
