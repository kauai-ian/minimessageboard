// Enables users to compose and submit new messages

import React, { useState } from "react";

export type MessageFormProps = {
  addMessage: (body: string, user: string) => void;
  loggedIn: boolean;
};

const MessageForm: React.FC<MessageFormProps> = ({
  addMessage,
  loggedIn,
}) => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loggedIn  || message === "") return;
    addMessage(message, user);
    setMessage("");
    setUser("");
  };

  return (
    <>
      {loggedIn ? (
        <section className="form-section">
          <h2>Create Message</h2>
          <h3>{user}</h3>
          <form
            action=""
            onSubmit={handleSubmit}
            className="new-message-form"
            name="new-message-form"
          >
            <div className="form-row">
              <label htmlFor="message">Message:</label>
              <input
                type="text"
                name="message"
                placeholder="Enter message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button className="btn">+</button>
          </form>
        </section>
      ) : (
        <p>Please log in to post a message.</p>
      )}
    </>
  );
};

export default MessageForm;
