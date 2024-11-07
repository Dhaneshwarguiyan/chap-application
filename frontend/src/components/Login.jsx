import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setLogin, setUserId } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(()=>{
    const login = localStorage.getItem("status");
    if(login === "true"){
      navigate('/people')
    }
  },[])


  const submitHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/signin",
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      setTimeout(() => {
        setLogin(true);
      }, 1000);
      setUserId(response.data.userId);
      //for persistent login
      localStorage.setItem("status", true);
      localStorage.setItem("userId",response.data.userId);
      //for changing the page in case of change of the variable in login
      // toast("hello")
      toast(`welcome ${response.data.userId}`);

    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="form">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter your email"
        value={formData.email}
        name="email"
        onChange={changeHandler}
      />
      <input
        type="password"
        placeholder="Enter your Password"
        value={formData.password}
        name="password"
        onChange={changeHandler}
      />
      <button onClick={submitHandler}>Login</button>
      <Link to={"/signup"}>
        <div className="link">Create an account</div>
      </Link>
      <ToastContainer />
    </div>
  );
};

export default Login;
