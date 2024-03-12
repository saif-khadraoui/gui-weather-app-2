import React, { useState } from 'react'
import styles from "./register.module.css"
import { Link, useNavigate } from 'react-router-dom';
import Axios from "axios"



function Register() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    console.log(email, username, password)
    e.preventDefault();
    Axios.post("http://localhost:1999/api/register", {
      email: email,
      username: username,
      password: password
    }).then((response) => {
      console.log(response)
      if(response){
        navigate("/login")
      }
    })
  };

  return (
    <div className={styles.container}>
        <div className={styles.main}>
            <h2>Login</h2>
          <form onSubmit={handleSubmit}>
          <div className={styles.input}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
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
              <button type="submit">Register</button>
            </div>
          </form>
          <p>Already a user?<Link to="/login">Login here</Link></p>
        </div>
    </div>
  )
}

export default Register