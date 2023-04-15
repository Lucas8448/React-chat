// App.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    socket.on('connectedUsers', (users) => {
      setConnectedUsers(users);
    });

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const handleSendMessage = (event) => {
    event.preventDefault();

    if (message.length > 0) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Connected Users:</h1>
      <ul>
        {connectedUsers.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
      <h1>Messages:</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
