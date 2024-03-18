// representation of an individual message

import React, { useState } from "react";
import capFrstLtr from "../helpers/CapFirstLtr";
import axios from "axios";
import { API_MessageBoard } from "../App";

export type MessageProps = {
  _id: string;
  user: string;
  title: string;
  text: string;
  timestamp: string;
  onEdit: (editedMessage: string) => void;
};

const Message: React.FC<MessageProps> = ({
  _id,
  user,
  title,
  text,
  timestamp,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`${API_MessageBoard}/${_id}`, { text: editedText });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating message", error);
    }
  };

  return (
    <>
      <li className="message">
        <div key={_id}>
          <span>User: {user}</span>
          <span>Title: {capFrstLtr(title)}</span>
          <span>Timestamp: {timestamp}</span>
          {editMode ? (
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
          ) : (
            <span>Message: {capFrstLtr(text)}</span>
          )}
          {editMode ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
        </div>
      </li>
    </>
  );
};

export default Message;
