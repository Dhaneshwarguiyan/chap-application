import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthProvider";
import axios from "axios";

const Chat = () => {
  const { userId, receiverId } = useContext(AuthContext);
  const [data, setData] = useState("");
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  const getAllMessages = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/messages/get",
        {
          userId: userId,
          receiverId: receiverId,
        },
        { withCredentials: true }
      );
      setMessages(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMessages();
    const clock = setInterval(() => {
      getAllMessages();
    }, 10000);
    return () => {
      clearInterval(clock);
    };
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    newSocket.emit("join", { userId, receiverId });
    newSocket.on("send_message");
    return () => {
      newSocket.close();
    };
  }, [receiverId, userId]);

  const submithandler = (e) => {
    e.preventDefault();

    axios.post(
      "http://localhost:3000/api/v1/messages/set",
      {
        userId: userId,
        receiverId: receiverId,
        data: data,
      },
      { withCredentials: true }
    ).then(()=>getAllMessages()).catch((e)=>{
      console.log(e)
    })
    if (socket && data) {
      socket.emit("private_message", {
        userId: userId,
        receiverId: receiverId,
        data: data,
      });
      setData("");
    }
  };

  return (
    <div>
      chat
      {receiverId && <>{` with ${receiverId}`}</>}
      <ul>
        {messages &&
          messages.map((message, i) => {
            return (
              <li key={i}>
                {message?.sender?.username}
                {" : "}
                {message?.content}
              </li>
            );
          })}
      </ul>
      <input
        type="text"
        value={data}
        onChange={(e) => {
          setData(e.target.value);
        }}
      />
      <button onClick={submithandler}>Send</button>
    </div>
  );
};

export default Chat;
