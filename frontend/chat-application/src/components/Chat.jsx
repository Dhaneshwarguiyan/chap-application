import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Chat = ({ receiver, username }) => {
  const [data,setData] = useState("");
  const [socket,setSocket] = useState(null);
  const [messages,setMessages] = useState([]);
  
  useEffect(()=>{
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);
    newSocket.emit('join',{username,receiver});
    newSocket.on('send_message',({username,data})=>{
      setMessages(
        (prevMessage)=>{
          return [...prevMessage,{username:username,data:data}]
        }
      );
    })
    return () => newSocket.close();
  },[receiver,username])

  const submithandler = (e)=> {
    console.log(messages)
    e.preventDefault();
    if(socket && data){
      socket.emit('private_message',{
        username:username,
        receiver:receiver,
        data:data
      });
      setMessages(
        (prevMessage)=>{
          return [...prevMessage,{username:username,data:data}]
        }
      );
      setData("");
    }
  }

  return (
    <div>
      chat
      {receiver && <>{` with ${receiver}`}</>}
      <ul>
        { messages &&
          messages.map((message,i)=>{
            return <li key={i}>{message.username}{" : "}{message.data}</li>
          })
        }
      </ul>
      <input type="text" value={data} onChange={(e)=>{setData(e.target.value)}}/>
      <button onClick={submithandler}>Send</button>
    </div>
  );
};

export default Chat;
