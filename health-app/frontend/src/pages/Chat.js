import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Chat() {

  const { id } = useParams(); // appointmentId
  const user = JSON.parse(localStorage.getItem("user"));

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // 🔥 FETCH MESSAGES
  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/chat/${id}`
      );
      setMessages(res.data);
    } catch (err) {
      console.log("Error fetching messages");
    }
  };

  // 🔥 AUTO REFRESH EVERY 2 SECONDS
  useEffect(() => {
    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 2000); // auto update

    return () => clearInterval(interval);
  }, [id]);

  // 🔥 SEND MESSAGE
  const send = async () => {
    if (!text.trim()) return;

    try {
      await axios.post("http://localhost:5000/api/chat/send", {
        appointmentId: id,
        sender: user.name,
        message: text
      });

      setText("");
      fetchMessages(); // instant update
    } catch (err) {
      console.log("Error sending message");
    }
  };

  return (
    <div className="main">
      <h2>💬 Chat</h2>

      {/* MESSAGES BOX */}
      <div
        className="card-box"
        style={{
          height: "300px",
          overflowY: "scroll",
          padding: "10px"
        }}
      >
        {messages.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          messages.map((m, i) => (
            <p
              key={i}
              style={{
                textAlign: m.sender === user.name ? "right" : "left",
                margin: "5px 0"
              }}
            >
              <b>{m.sender}:</b> {m.message}
            </p>
          ))
        )}
      </div>

      {/* INPUT */}
      <input
        style={{ width: "70%", marginTop: "10px" }}
        placeholder="Type message"
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <button
        style={{ marginLeft: "10px" }}
        onClick={send}
      >
        Send
      </button>
    </div>
  );
}

export default Chat;