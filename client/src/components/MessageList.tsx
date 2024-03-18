// displays the list of messages from the state
import React from "react";
import Message, { MessageProps } from "./Message";

export type MessageListProps = {
  messageBoard: MessageProps[];
};

const MessageList: React.FC<MessageListProps> = ({ messageBoard }) => {
  return (
    <ul>
      {messageBoard.map((message) => (
        <Message key={message._id} {...message} />
      ))}
    </ul>
  );
};

export default MessageList;
