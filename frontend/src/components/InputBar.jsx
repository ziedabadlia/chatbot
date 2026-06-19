import React, { useState } from "react";

function InputBar({ onSend, disabled }) {
  const [text, setText] = useState("");

  function handleSend() {
    if (text.trim() === "") return;
    onSend(text.trim());
    setText("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSend();
    }
  }

  return (
    <div className='input-bar'>
      <input
        type='text'
        placeholder={disabled ? "Connecting..." : "Ask me about movies..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <button className='btn-send' onClick={handleSend} disabled={disabled}>
        ➤
      </button>
    </div>
  );
}

export default InputBar;
