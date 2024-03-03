import React from 'react'
import { IoMdMenu } from "react-icons/io";
import styles from "./navbar.module.css"

function Navbar() {

    const openMobileSidebar = () => {
        document.getElementById("mobileContainer").style.display = "block"
        document.getElementById("hamburger").style.display = "none"
    }

  return (
    <div className={styles.container}>
        <IoMdMenu style={{ width: "30px", height: "30px", cursor: "pointer" }} className={styles.hamburger} id="hamburger" onClick={openMobileSidebar}/>
        <div className={styles.button}>
          <button>Login</button>
        </div>
    </div>
  )
}

export default Navbar