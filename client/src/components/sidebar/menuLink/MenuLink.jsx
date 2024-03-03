import React, { useContext } from 'react'
import styles from "./menuLink.module.css"
import { Link, useLocation } from 'react-router-dom'

function MenuLink({ item }) {
    const pathname = useLocation()
    console.log(pathname.pathname)
  return (
    <Link to={item.path} className={`${styles.container} ${pathname.pathname === item.path && styles.active}`}>
        {item.icon}
        {item.title}
    </Link>
  )
}

export default MenuLink