// representation of an individual message

import capFrstLtr from "../helpers/CapFirstLtr";

export type MessageProps = {
  id: string;
  user: string;
  text: string;
  timestamp: string;
};

// user, text, timestamp

const Message = ({ id, user, text, timestamp }: MessageProps) => {
  return (
    <>
      <li className="message">
        <div key={id}>
          <span>User: {user}</span>
          <span>Text: {capFrstLtr(text)}</span>
          <span>Timestamp: {timestamp}</span>
        </div>
      </li>
    </>
  );
};

export default Message;
