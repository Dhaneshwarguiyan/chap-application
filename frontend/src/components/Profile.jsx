import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthProvider";

const Profile = ({ id,username,email}) => {
  const navigate = useNavigate();
  const {setReceiverId} = useContext(AuthContext);
  const clickHandler = ()=>{
    setReceiverId(id);
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
