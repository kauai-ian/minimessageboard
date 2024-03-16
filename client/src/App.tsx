import { useState } from "react";
import "./App.css";
// import axios from "axios";
import MessageList from "./components/MessageList";
import { MessageProps } from "./components/Message";
import MessageForm from "./components/MessageForm";

// set API for messageBoard
// const API_MessageBoard = "http://localhost:3000/messageBoard";

function App() {
  const [messageBoard, setMessageBoard] = useState<MessageProps[]>([  ]);

  // useEffect to fetchData

  //render items function maps over the message board for each message it displays the message data

  const addMessage = ( title: string, message: string, user: string) => {
    const timestamp = new Date().toISOString()
    const id = timestamp
    if (message) {
      setMessageBoard([...messageBoard, { id, title, message, user, timestamp}]); //update state
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
      <MessageForm addMessage={addMessage}/>
        
    </>
  );
}

export default App;
