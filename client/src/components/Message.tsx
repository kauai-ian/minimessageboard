// representation of an individual message

import React, { useState } from "react";
import capFrstLtr from "../helpers/CapFirstLtr";
import { MessageType } from "../types";

export type MessageProps = MessageType & {
  onUpdate: (editedMessage: string, id: string) => void;
};

const Message: React.FC<MessageProps> = ({
  _id,
  user,
  title,
  text,
  timestamp,
  onUpdate,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      onUpdate(editedText, _id);
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
