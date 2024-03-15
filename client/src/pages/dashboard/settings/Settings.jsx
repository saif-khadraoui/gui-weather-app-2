import React, { useState, useEffect } from 'react'
import styles from "./settings.module.css";
import { CgProfile } from "react-icons/cg";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { PiPlantLight } from "react-icons/pi";
import { RiOilLine } from "react-icons/ri";
import Axios from "axios"
import { useParams } from "react-router-dom"

function Settings() {

  const {id} = useParams()
  const [email, setEmail] = useState()
  const [username, setUsername] = useState()

  useEffect(() => {
    const getProfile = async () => {
      await Axios.get("http://localhost:1999/api/getProfile", {
        params: { id }
      }).then((response) => {
        console.log(response)
        setEmail(response.data[0].email)
        setUsername(response.data[0].username)
      })
    }

    getProfile()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.settings}>
        <div className={styles.profilePic}>
          <CgProfile className={styles.picture}/>
        </div>
        <div className={styles.userDetails}>
          <h5>Details</h5>
          <input type='email' placeholder={email} />
          <input type='text' placeholder={username} />
        </div>
        <div className={styles.preferences}>
          <h5>Preferences</h5>
          <div className={styles.locationPreference} id={styles.preference}>
            <div className={styles.left}>
              <IoLocationOutline />
              <p>Add location</p>
            </div>
            <IoIosArrowForward />
          </div>
          <div className={styles.cropsPreference} id={styles.preference}>
            <div className={styles.left}>
              <PiPlantLight />
              <p>Add crop</p>
            </div>
            <IoIosArrowForward />
          </div>
          <div className={styles.commoditiesPreference} id={styles.preference}>
            <div className={styles.left}>
              <RiOilLine />
              <p>Add commodity</p>
            </div>
            <IoIosArrowForward />
          </div>
        </div>
        <div className={styles.button}>
          <button>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Settings