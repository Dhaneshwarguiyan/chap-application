import axios from "axios";
import { useState } from "react"
import { ToastContainer,toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        username:"",
        email:"",
        password:""
    });

    const submitHandler = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/signup',{
                email:formData.email,
                username:formData.username,
                password:formData.password
            });
            toast(response.data.message);
            navigate('/')
        } catch (error) {
            console.log(error); 
        }
    }

    const changeHandler = (e) => {
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }
  return (
    <div className="form">
        <h2>Signup</h2>
      <input type="text" placeholder="Enter your username" value={formData.username} name="username" onChange={changeHandler}/>
      <input type="email" placeholder="Enter your email" value={formData.email} name="email" onChange={changeHandler}/>
      <input type="password" placeholder="Enter your Password" value={formData.password} name="password" onChange={changeHandler}/>
      <button onClick={submitHandler}>Create User</button>
      <Link to={'/'}><div className="link">Already have an account</div></Link>
      <ToastContainer />

    </div>
  )
}

export default Signup
