import React from 'react'
import { IoMdMenu } from "react-icons/io";
import styles from "./navbar.module.css"
import { useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()

  const openMobileSidebar = () => {
      document.getElementById("mobileContainer").style.display = "block"
      document.getElementById("hamburger").style.display = "none"
  }

  const routeLogin = () => {
    navigate("/login")
  }

  return (
    <div className={styles.container}>
        <IoMdMenu style={{ width: "30px", height: "30px", cursor: "pointer" }} className={styles.hamburger} id="hamburger" onClick={openMobileSidebar}/>
        <div className={styles.button}>
          <button onClick={routeLogin}>Login</button>
        </div>
    </div>
  )
}

export default Navbar