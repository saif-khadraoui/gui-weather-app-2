import React from 'react'
import styles from "./login.module.css"
import LoginForm from '../../components/loginForm/loginForm'


function Login() {
  return (
    <div className={styles.container}>
        <div className={styles.main}>
          <LoginForm />
        </div>
    </div>
  )
}

export default Login