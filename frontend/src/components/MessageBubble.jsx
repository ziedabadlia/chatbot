import React from "react";

const MessageBubble = ({ message }) => {
  const sender = message.sender;
  const text = message.text;
  const timestamp = message.timestamp;

  if (sender === "user") {
    return (
      <div className='message-row user'>
        <div className='user-msg-wrapper'>
          <div className='bubble user'>{text}</div>
          <div className='timestamp' style={{ textAlign: "right" }}>
            {timestamp}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='message-row bot'>
      <div className='d-flex align-items-end'>
        <div className='bot-avatar'>🎬</div>
        <div>
          <div className='bubble bot'>{text}</div>
          <div className='timestamp'>{timestamp}</div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
