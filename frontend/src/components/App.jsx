import React, { useState, useEffect, useRef } from "react";
import ChatWindow from "./ChatWindow";
import InputBar from "./InputBar";

const SERVER_URL = "ws://127.0.0.1:5000/chat";

function App() {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [botIsTyping, setBotIsTyping] = useState(false);
  const websocket = useRef(null);

  useEffect(() => {
    connectToServer();
    return () => {
      if (websocket.current) websocket.current.close();
    };
  }, []);

  function connectToServer() {
    const ws = new WebSocket(SERVER_URL);
    websocket.current = ws;

    ws.onopen = function () {
      setIsConnected(true);
    };
    ws.onmessage = function (event) {
      const msg = JSON.parse(event.data);
      setBotIsTyping(false);
      setMessages((prev) => [...prev, msg]);
    };
    ws.onclose = function () {
      setIsConnected(false);
    };
    ws.onerror = function (err) {
      console.log("error:", err);
    };
  }

  function sendMessage(text) {
    if (text === "" || websocket.current === null) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage = { sender: "user", text: text, timestamp: timeString };
    setMessages((prev) => [...prev, userMessage]);
    setBotIsTyping(true);
    websocket.current.send(JSON.stringify({ message: text }));
  }

  function resetChat() {
    if (websocket.current) websocket.current.close();
    setMessages([]);
    setBotIsTyping(false);
    setTimeout(connectToServer, 200);
  }

  function exportChat() {
    const dataStr = JSON.stringify(messages, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "chat-export.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className='chat-wrapper'>
      <div className='chat-header'>
        <div className='d-flex align-items-center gap-2'>
          <button className='btn-action' onClick={() => setShowLanding(true)}>
            ← Back
          </button>
          <h5 style={{ margin: 0 }}>🎬 CineBot</h5>
        </div>
        <div className='d-flex gap-2 align-items-center'>
          <span
            style={{
              fontSize: "0.75rem",
              color: isConnected ? "#4caf50" : "#f44336",
            }}
          >
            {isConnected ? "● Online" : "● Offline"}
          </span>
          <button className='btn-action' onClick={exportChat}>
            ⬇ Export
          </button>
          <button className='btn-action' onClick={resetChat}>
            ↺ Reset
          </button>
        </div>
      </div>
      <ChatWindow messages={messages} typing={botIsTyping} />
      <InputBar onSend={sendMessage} disabled={!isConnected} />
    </div>
  );
}

export default App;
