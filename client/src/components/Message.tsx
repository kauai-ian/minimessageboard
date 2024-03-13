// representation of an individual message

import capFrstLtr from "../helpers/CapFirstLtr";

export type MessageProps = {
    user: string,
    text: string,
    timestamp: string
}

// user, text, timestamp

const Message = ({ user, text, timestamp }: MessageProps) => {
  return (
    <>
      <li className="message">
        <div>
          <span>User: {user}</span>
          <span>Text: {capFrstLtr(text)}</span>
          <span>Timestamp: {timestamp}</span>
        </div>
      </li>
    </>
  );
};

export default Message;

