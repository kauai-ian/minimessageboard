// representation of an individual message

import React from "react";
import capFrstLtr from "../helpers/CapFirstLtr";

export type MessageProps = {
  id: string;
  user: string;
  title: string;
  message: string;
  timestamp: string;
};

// user, text, timestamp

const Message: React.FC<MessageProps> = ({
  id,
  user,
  title,
  message,
  timestamp,
}) => {
  return (
    <>
      <li className="message">
        <div key={id}>
          <span>User: {user}</span>
          <span>Title: {capFrstLtr(title)}</span>
          <span>Message: {capFrstLtr(message)}</span>
          <span>Timestamp: {timestamp}</span>
        </div>
      </li>
    </>
  );
};

export default Message;