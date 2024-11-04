import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Chat from "./components/Chat";
import People from "./components/People";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/ReactToastify.css";

function App() {
  const [username, setUsername] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
      if(username){
        navigate('/people');
      }else{
        navigate('/')
      }
  }, [username]);
  return (
    <>
        <Routes>
          <Route path="/people" element={<People username={username} setReceiver={setReceiver}/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login setUsername={setUsername} />} />
          <Route path="/chat" element={<Chat username={username} receiver={receiver}/>} />
        </Routes>

    </>
  );
}

export default App;
