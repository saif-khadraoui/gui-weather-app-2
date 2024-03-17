import React from 'react'
import styles from "./sidebar.module.css"
import { FaCloud } from "react-icons/fa6";
import { IoCloudyNightSharp } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { SiSimpleanalytics } from "react-icons/si";
import { GoAlertFill } from "react-icons/go";
import { IoCloseSharp } from "react-icons/io5";


import MenuLink from './menuLink/MenuLink';

function Sidebar() {
  const userId = localStorage.getItem("userId")

  const items = [
    {
      title: "Weather",
      path: "/dashboard/",
      icon: <FaCloud />
    },
    {
      title: "History",
      path: "/dashboard/history",
      icon: <FaHistory />
    },
    {
      title: "Analytics",
      path: "/dashboard/analytics",
      icon: <SiSimpleanalytics />
    },
    {
      title: "Alerts",
      path: "/dashboard/alerts",
      icon: <GoAlertFill />
    }
  ]

  const settingsItem = {
    title: "Settings",
    path: `/dashboard/settings/${userId}`,
    icon: <GoAlertFill />
  }


  const closeMobileContainer = () => {
    document.getElementById("mobileContainer").style.display = "none"
    document.getElementById("hamburger").style.display = "block"
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.logo}>
              <IoCloudyNightSharp style={{ width: "32px", height: "32px" }}/>
              <h3>FarmCast</h3>
            </div>
            <ul className={styles.list}>
              {items.map((item, idx) => {
                return <MenuLink item={item}/>
              })}
            </ul>
        </div>
        {userId && (
          <MenuLink item={settingsItem}/>
        )}

      </div>
      <div className={styles.mobileContainer} id="mobileContainer">
        <div className={styles.header}>
          <div className={styles.logo}>
            <IoCloudyNightSharp style={{ width: "32px", height: "32px" }}/>
            <h3>FarmCast</h3>
          </div>
          <div className={styles.closeMobile}>
            <IoCloseSharp style={{ width: "30px", height: "30px", cursor: "pointer" }} onClick={closeMobileContainer} />
          </div>
        </div>
        <ul className={styles.list}>
          {items.map((item, idx) => {
            return <MenuLink item={item}/>
          })}
        </ul>
        {userId && (
          <MenuLink item={settingsItem}/>
        )}
      </div>
    </>
  )
}

export default Sidebar