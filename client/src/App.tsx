import { useState } from "react";
import "./App.css";
// import axios from "axios";
import MessageList from "./components/MessageList";
import { MessageProps } from "./components/Message";

// set API for messageBoard
// const API_MessageBoard = "http://localhost:3000/messageBoard";

function App() {
  const [messageBoard, setMessageBoard] = useState<MessageProps[]>([
    {
      id: "1",
      user: "John",
      text: "Hello, world!",
      timestamp: "2022-03-10T12:00:00",
    },
    {
      id: "2",
      user: "Alice",
      text: "How are you?",
      timestamp: "2022-03-10T12:05:00",
    },
  ]);

  // useEffect to fetchData

  //render items function maps over the message board for each message it displays the message data

  const additem = (newItem: MessageProps) => {
    if (newItem) {
      const timestamp = new Date(Date.now()).toISOString();
      newItem.timestamp = timestamp;
      const updatedMessageBoard = [...messageBoard, newItem]; // add the new item to the existing mb array
      setMessageBoard(updatedMessageBoard); //update state
    }
  };
  // TODO: render items function
  // TODO: edit item function
  // TODO: delete item function

  return (
    <>
      {/* message list and inside it the messages */}
      <h1>Message Board</h1>
      <MessageList messageBoard={messageBoard} />
      {/* form & button to add new message */}
      <button
        onClick={() =>
          additem({
            id: Date.now().toString(),
            user: "Jane",
            text: "New message",
            timestamp: "",
          })
        }
      >
        Add new message
      </button>
    </>
  );
}

export default App;
