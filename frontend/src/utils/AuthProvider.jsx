import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [login,setLogin] = useState(()=>(
      localStorage.getItem("status") === "true"  
    ));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [receiverId, setReceiverId] = useState(null);
  

    useEffect(()=>{
        const status = localStorage.getItem('status');
        if(status === "true"){
            navigate('/people')
        }
    },[login])

    return (
    <AuthContext.Provider value={{login,setLogin,userId,setUserId,receiverId,setReceiverId}}>
        {children}
    </AuthContext.Provider>)
}

export default AuthProvider;