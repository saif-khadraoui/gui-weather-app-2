import React from 'react'
import styles from "./dashboard.module.css"
import Sidebar from '../../components/sidebar/Sidebar'
import { Outlet } from "react-router-dom"
import Navbar from '../../components/navbar/Navbar'

function Dashboard() {
  return (
    <div className={styles.container}>
        <Sidebar />
        <div className={styles.main}>
          <Navbar />
          <Outlet />
        </div>
    </div>
  )
}

export default Dashboard