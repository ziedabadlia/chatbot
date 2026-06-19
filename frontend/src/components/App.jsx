import React, { useState, useEffect, useRef } from 'react';
import ChatWindow from './ChatWindow';
import InputBar from './InputBar';

const WS_URL = 'ws://127.0.0.1:5000/chat';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => { connect(); return () => wsRef.current?.close(); }, []);

  function connect() {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;
    ws.onopen = () => setConnected(true);
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      setTyping(false);
      setMessages(prev => [...prev, msg]);
    };
    ws.onclose = () => setConnected(false);
  }

  function sendMessage(text) {
    if (!text.trim() || !wsRef.current) return;
    const userMsg = { sender: 'user', text, timestamp: now() };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);
    wsRef.current.send(JSON.stringify({ message: text }));
  }

  function handleReset() {
    wsRef.current?.close();
    setMessages([]);
    setTyping(false);
    setTimeout(connect, 200);
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(messages, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function now() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <h5>🎬 CineBot</h5>
        <div className="d-flex gap-2 align-items-center">
          <span style={{ fontSize: '0.75rem', color: connected ? '#4caf50' : '#f44336' }}>
            {connected ? '● Online' : '● Offline'}
          </span>
          <button className="btn-action" onClick={handleExport}>⬇ Export</button>
          <button className="btn-action" onClick={handleReset}>↺ Reset</button>
        </div>
      </div>
      <ChatWindow messages={messages} typing={typing} />
      <InputBar onSend={sendMessage} disabled={!connected} />
    </div>
  );
}
