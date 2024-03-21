import React, { useState } from 'react'
import styles from "./login.module.css"
//import LoginForm from '../../components/loginForm/loginForm'
import { Link, useNavigate } from 'react-router-dom';
import Axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Login() {

  const navigate = useNavigate()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // function to check if user can log in 
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.get("http://localhost:1999/api/login", {
      params: { username, password }
    }).then((response) => {
      console.log(response.data)
      if(response.data){
        navigate("/")
        localStorage.setItem("userId", response.data._id)
      } else{
        toast("Incorrect email or password!")
        console.log("wrong")
      }
    })
  };

  return (
    <div className={styles.container}>
        <div className={styles.main}>
            <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.input}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.button}>
              <button type="submit">Login</button>
            </div>
          </form>
          <p>Not a user yet?<Link to="/register">Register here</Link></p>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Login