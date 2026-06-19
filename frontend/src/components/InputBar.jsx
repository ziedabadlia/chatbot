import React, { useState } from 'react';

export default function InputBar({ onSend, disabled }) {
  const [text, setText] = useState('');

  function handleSend() {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  }

  return (
    <div className="input-bar">
      <input
        type="text"
        placeholder={disabled ? 'Connecting...' : 'Ask me about movies...'}
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
        disabled={disabled}
      />
      <button className="btn-send" onClick={handleSend} disabled={disabled}>➤</button>
    </div>
  );
}
