import { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

export default function LiveChat() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [role, setRole] = useState('User'); // Toggle between User and Astrologer
  const roomName = 'consultation-room-1';

  useEffect(() => {
    // Connect to the Pusher WebSocket
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || 'mock-key', {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'mt1',
    });

    // Subscribe to this specific chat room
    const channel = pusher.subscribe(roomName);

    // Listen for new messages coming from the server
    channel.bind('new-message', function(data) {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      pusher.unsubscribe(roomName);
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const msg = inputText;
    setInputText(''); // Clear input instantly for snappy feel

    await fetch('/api/v2/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg, sender: role, room: roomName }),
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>⚡️ Real-Time Consultation</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <strong>I am the: </strong>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="User">User</option>
          <option value="Astrologer">Astrologer</option>
        </select>
      </div>

      <div style={{ height: '300px', border: '1px solid #ccc', padding: '10px', overflowY: 'scroll', marginBottom: '10px', borderRadius: '8px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.sender === role ? 'right' : 'left', margin: '10px 0' }}>
            <span style={{ 
              background: m.sender === 'User' ? '#e0f2fe' : '#fce7f3', 
              padding: '8px 12px', 
              borderRadius: '16px',
              display: 'inline-block' 
            }}>
              <strong>{m.sender}: </strong> {m.message}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px' }}>
        <input 
          value={inputText} 
          onChange={(e) => setInputText(e.target.value)} 
          placeholder="Type a message..." 
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#000', color: '#fff', border: 'none', borderRadius: '4px' }}>Send</button>
      </form>
    </div>
  );
}
