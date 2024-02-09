// import { io } from "socket.io-client";
import "./App.css";
// import { useEffect, useState } from "react";


// const socket = io('https://quick-chat-server.vercel.app');

function App() {
  // const [messages, setMessages] = useState([]);
  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   // lisen for incomming message 
  //   socket.on('chat message', msg => {
  //     setMessages((prevMessage) => [...prevMessage, msg])
  //   })

  //   // clean up when disconnected
  //   return () => {
  //     socket.disconnect();
  //   }
  // }, [])

  // const sendMessage = () => {
  //   socket.emit('chat message', message);
  //   setMessage('');
  // }

  return (
    <>
      <h1>Vite + React</h1>

      {/* <div>
        <ul>
          {messages.map((msg, idx) => {
            <li key={idx}>{msg}</li>
          })}
        </ul>

        <input 
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={sendMessage}>Send </button>
      </div> */}
    </>
  );
}

export default App;
