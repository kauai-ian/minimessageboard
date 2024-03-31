import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Message from "./components/Message";
import MessageForm from "./components/MessageForm";
import { MessageType } from "./types";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";

// set API for messageBoard
const API_MessageBoard = "http://localhost:3000";

export const MessageBoard = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  // useEffect to fetchData
  useEffect(() => {
    fetchData();
  }, []);

  //render items function maps over the message board for each message it displays the message data
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_MessageBoard}/messages`);
      if (!res) {
        throw new Error("failed to fetch the data");
      }
      setMessages(res.data.data);
    } catch (error) {
      console.error("failed to fetch data", error);
    }
  };

  const addMessage = async (title: string, text: string, user: string) => {
    try {
      const { data } = await axios.post(`${API_MessageBoard}/messages`, {
        title,
        text,
        user,
      });
      setMessages([...messages, data.data]);
    } catch (error) {
      console.error("failed to add message", error);
    }
  };

  const handleUpdateMessages = async (text: string, id: string) => {
    try {
      const res = await axios.put(`${API_MessageBoard}/messages/${id}`, {
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
      await axios.delete(`${API_MessageBoard}/messages/${id}`);
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
      </ul>
    </>
  );
};
