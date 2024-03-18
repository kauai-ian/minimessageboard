import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import MessageList from "./components/MessageList";
import { MessageProps } from "./components/Message";
import MessageForm from "./components/MessageForm";

// set API for messageBoard
export const API_MessageBoard = "http://localhost:3000/messages";

function App() {
  const [messageBoard, setMessageBoard] = useState<MessageProps[]>([]);

  // useEffect to fetchData
  useEffect(() => {
    fetchData();
  }, []);

  //render items function maps over the message board for each message it displays the message data
  const fetchData = async () => {
    try {
      const res = await axios.get(API_MessageBoard);
      if (!res) {
        throw new Error("failed to fetch the data");
      }
      setMessageBoard(res.data);
    } catch (error) {
      console.error("failed to fetch data", error);
    }
  };

  const addMessage = async (title: string, text: string, user: string) => {
    try {
      const timestamp = new Date().toISOString();

      await axios.post(API_MessageBoard, { title, text, user, timestamp });
      fetchData();
    } catch (error) {
      console.error("failed to add message", error);
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
      <MessageForm addMessage={addMessage} />
    </>
  );
}

export default App;
