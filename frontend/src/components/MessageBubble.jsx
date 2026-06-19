import React from "react";

export default function MessageBubble({ message }) {
  const { sender, text, timestamp } = message;
  const isUser = sender === "user";
  return (
    <div className={`message-row ${sender}`}>
      {!isUser ? (
        <div className='d-flex align-items-end'>
          <div className='bot-avatar'>🎬</div>
          <div>
            <div className='bubble bot'>{text}</div>
            <div className='timestamp'>{timestamp}</div>
          </div>
        </div>
      ) : (
        <div className='user-msg-wrapper'>
          <div className='bubble user'>{text}</div>
          <div className='timestamp' style={{ textAlign: "right" }}>
            {timestamp}
          </div>
        </div>
      )}
    </div>
  );
}
