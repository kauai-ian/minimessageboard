import { useEffect, useState } from "react";
import axios from "axios";
import Message from "../components/Message";
import { MessageType } from "../types";
import API_Url from "../api/config";
import MessageForm from "../components/MessageForm";
import { useAuthContext } from "../context/auth.context";
axios.defaults.withCredentials = true
type UserData= {
_id: string
}

const MessageBoard = () => {
  const { loggedIn, cookies } = useAuthContext();
  const [messages, setMessages] = useState<MessageType[]>([]);

  //fetchData anytime state changes
  useEffect(() => {
    fetchData();
  }, []);

  //render items function maps over the message board for each message it displays the message data
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_Url}/messages`);
      if (!res) {
        throw new Error("failed to fetch the data");
      }
      setMessages(res.data.data);
    } catch (error) {
      console.error("failed to fetch data", error);
    }
  };
//TODO: getting an error from front end request pointing to the below. 
  const addMessage = async ( text: string, _id: string) => {
    try {
      console.log(cookies)
      const userId: string = (cookies['user-cookie'] as UserData )._id
      console.log("Data being sent:", { body: text, userId });

      const response = await axios.post(`${API_Url}/messages`, {
        body: text,
        _id,
      });

       // Log the entire request and response
    console.log("Request:", response.request);
    console.log("Response:", response.data);

      setMessages([...messages, response.data]);
    } catch (error) {
      console.error("failed to add message", error);
    }
  };

  const handleUpdateMessages = async (text: string, id: string) => {
    try {
      const res = await axios.put(`${API_Url}/messages/${id}`, {
        body: { text },
      });
      if (!res || res.status !== 200) {
        throw new Error("failed to update the message");
      }
      const updateMessage = res.data.data;
      const updatedMessages = messages.map((message) =>
        message._id === updateMessage._id ? updateMessage : message
      );
      setMessages(updatedMessages);
    } catch (error) {
      console.error("failed to update message", error);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await axios.delete(`${API_Url}/messages/${id}`);
      setMessages((prevMessages: MessageType[]) =>
        prevMessages.filter((message) => message._id !== id)
      );
    } catch (error) {
      console.error("failed to delete message", error);
    }
  };

  return (
    <>
      <h1>Message Board</h1>
      <ul>
        {messages.map((message) => (
          <Message
            key={message._id}
            {...message}
            onUpdate={handleUpdateMessages}
            onRemove={handleRemove}
          />
        ))}
      </ul>{" "}
      {loggedIn && <MessageForm addMessage={addMessage} loggedIn={loggedIn} />}
    </>
  );
};

export default MessageBoard;
