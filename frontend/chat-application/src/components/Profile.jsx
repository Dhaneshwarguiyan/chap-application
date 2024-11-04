import { useNavigate } from "react-router-dom";
const Profile = ({ username,email,setReceiver }) => {
  const navigate = useNavigate();
  const clickHandler = ()=>{
    setReceiver(username);
    navigate('/chat');
  }
  return (
    <div className="card">
      <div className="left">
        <div>{username}</div>
        <div className="email">{email}</div>
      </div>
      <div className="right" onClick={clickHandler}>Chat</div>
    </div>
  );
};

export default Profile;
