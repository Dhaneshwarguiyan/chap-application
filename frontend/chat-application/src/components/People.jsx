import axios from "axios";
import { useEffect, useState } from "react";
import Profile from './Profile.jsx'

const People = ({username,setReceiver}) => {
  const [users, setUsers] = useState(null);
  const getAll = async () => {
    try {
      const allUsers = await axios.get("http://localhost:3000/api/v1/all");
      console.log(allUsers.data);
      setUsers(allUsers.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
      getAll();
    const clock = setInterval(() => {
      getAll();
    }, 5000);
    return () => {
      clearInterval(clock);
    };
  }, [username]);
  return (
    <div className="people">
      <h2>People</h2>
      {users &&
        users.map((user, i) => {
          return <Profile key={i} email={user.email} username={user.username} setReceiver={setReceiver}/>;
        })}
    </div>
  );
};

export default People;
