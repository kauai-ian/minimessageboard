// representation of an individual message

import React, { useState } from "react";
import capFrstLtr from "../helpers/CapFirstLtr";
import { MessageType } from "../types";

export type MessageProps = MessageType & {
  onUpdate: (editedMessage: string, id: string) => void;
  onRemove: (id: string) => void;
};

const Message: React.FC<MessageProps> = ({
  _id,
  author: { username }, // destructure the username from the object author
  body,
  updatedAt,
  onUpdate,
  onRemove,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(body);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      onUpdate(editedText, _id);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating message", error);
    }
  };

  const handleRemove = async () => {
    onRemove(_id)
  };


  return (
    <>
      <li className="message">
        <div key={_id}>
          <span>User: {username}</span>
          <span>Timestamp: {updatedAt}</span>
          {editMode ? (
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
          ) : (
            <span>Message: {capFrstLtr(body)}</span>
          )}
          {editMode ? (
            <>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleRemove}>Remove</button>
            </>
          ) : (
            <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleRemove}>Remove</button>
            </>
          )}
        </div>
      </li>
    </>
  );
};

export default Message;
