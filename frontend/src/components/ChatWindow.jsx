import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

export default function ChatWindow({ messages, typing }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  return (
    <div className="chat-window">
      {messages.map((msg, i) => <MessageBubble key={i} message={msg} />)}
      {typing && (
        <div className="message-row bot">
          <div className="d-flex align-items-center">
            <div className="bot-avatar">🎬</div>
            <div className="bubble bot typing-indicator">
              <span /><span /><span />
            </div>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
