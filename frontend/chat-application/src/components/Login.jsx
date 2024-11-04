import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const Login = ({ setUsername }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const submitHandler = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/signin", {
        email: formData.email,
        password: formData.password,
      });
      setTimeout(() => {
        setUsername(response.data.data.username);
      }, 1000);
      toast(response.data.message);
      toast(`welcome ${response.data.data.username}`);
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
