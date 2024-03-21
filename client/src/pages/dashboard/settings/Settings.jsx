import React, { useState, useEffect } from 'react'
import styles from "./settings.module.css";
import { CgProfile } from "react-icons/cg";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { PiPlantLight } from "react-icons/pi";
import { RiOilLine } from "react-icons/ri";
import Axios from "axios"
import { useParams } from "react-router-dom"
import AddPreferenceModal from '../../../components/addPreferenceModal/AddPreferenceModal';

function Settings() {

  const {id} = useParams()
  const userId = id
  const [email, setEmail] = useState()
  const [username, setUsername] = useState()
  const [savedLocations, setSavedLocations] = useState([])
  const [savedCrops, setSavedCrops] = useState([])

  const [modal, setModal] = useState(false)
  const [type, setType] = useState("")

  useEffect(() => {
    const getProfile = async () => {
      await Axios.get("http://localhost:1999/api/getProfile", {
        params: { id }
      }).then((response) => {
        // console.log(response)
        setEmail(response.data[0].email)
        setUsername(response.data[0].username)
        setSavedLocations(response.data[0].locations)
        setSavedCrops(response.data[0].crops)
      })
    }

    getProfile()
  }, [modal, savedLocations, savedCrops])

  const openModal = (preference) => {
    setModal(true)
    setType(preference)
  }

  const deleteSavedLocation = async (locationId) => {
    console.log(locationId)
    await Axios.post("http://localhost:1999/api/deleteSavedLocation", {
      userId: userId,
      locationId: locationId
    }).then((response) => {
      console.log(response)
    })
  }

  const deleteSavedCrop = async (crop) => {
    console.log(crop)
    await Axios.post("http://localhost:1999/api/deleteSavedCrop", {
      userId: userId,
      crop: crop
    }).then((response) => {
      console.log(response)
    })
  }

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
          <div className={styles.locationPreference} id={styles.preference} onClick={(() => openModal("location"))}>
            <div className={styles.left}>
              <IoLocationOutline />
              <p>Add location</p>
            </div>
            <IoIosArrowForward />
            </div>

            {savedLocations.map((item, idx) => {
              return (
                <div className={styles.locationPreferenceResult}>
                  <p>{item.name}</p>
                  <IoMdClose style={{ cursor: "pointer" }} onClick={() => deleteSavedLocation(item.id)}/>
                </div>
              )
            })}
          <div className={styles.cropsPreference} id={styles.preference} onClick={(() => openModal("crop"))}>
            <div className={styles.left}>
              <PiPlantLight />
              <p>Add crop</p>
            </div>
            <IoIosArrowForward />
          </div>
          {savedCrops.map((item, idx) => {
              return (
                <div className={styles.locationPreferenceResult}>
                  <p>{item.name}</p>
                  <IoMdClose style={{ cursor: "pointer" }} onClick={() => deleteSavedCrop(item)}/>
                </div>
              )
          })}
          {/* <div className={styles.commoditiesPreference} id={styles.preference} onClick={(() => openModal("commodity"))}>
            <div className={styles.left}>
              <RiOilLine />
              <p>Add commodity</p>
            </div>
            <IoIosArrowForward />
          </div> */}
        </div>
      </div>
      {modal && <AddPreferenceModal type ={type} setModal={setModal}/>}
    </div>
  )
}

export default Settings