import React, { useEffect, useState } from 'react'
import styles from "./locationSelector.module.css"
import Axios from "axios"

function LocationSelector() {
    const userId = localStorage.getItem("userId")
    const [locations, setLocations] = useState([])

    useEffect(() => {
        const getLocations = async () => {
            const id = userId
            await Axios.get("http://localhost:1999/api/getProfile", {
                params: { id }
            }).then((response) => {
                console.log(response)
                setLocations(response.data[0].locations)
            })
        }

        getLocations()
    }, [])

  return (
    <div className={styles.container}>
        <select>
            <option>Select a location</option>
            {locations.map((item, idx) => {
                return (
                    <option onClick={searchWeather}>{item.name}</option>
                )
            })}
        </select>
    </div>
  )
}

export default LocationSelector