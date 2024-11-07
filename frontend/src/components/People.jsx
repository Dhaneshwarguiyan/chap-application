import axios from "axios";
import { useEffect, useState } from "react";
import Profile from "./Profile.jsx";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthProvider.jsx";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const People = () => {
  const navigate = useNavigate();
  const { setUserId, setLogin } = useContext(AuthContext);
  const [users, setUsers] = useState(null);
  const getAll = async () => {
    try {
      const allUsers = await axios.get("http://localhost:3000/api/v1/all", {
        withCredentials: true,
      });
      setUsers(allUsers?.data?.filter((user)=>JSON.stringify(user.id) !== localStorage.getItem("userId")));
    } catch {
      handleLogout();
    }
  };
  const handleLogout = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/logout", {
      withCredentials: true,
    });
    setUserId(null);
    setLogin(false);
    localStorage.setItem("status", false);
    localStorage.setItem("userId", "");
    toast(response.data.message);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  useEffect(() => {
    getAll();
    const clock = setInterval(() => {
      getAll();
    }, 5000);
    return () => {
      clearInterval(clock);
    };
  }, []);
  return (
    <div className="people">
      <h2>People</h2>
      <button onClick={handleLogout}>Logout</button>
      {users &&
        users.map((user, i) => {
          return (
            <Profile
              key={i}
              id={user.id}
              email={user.email}
              username={user.username}
            />
          );
        })}
      <ToastContainer />
    </div>
  );
};

export default People;
