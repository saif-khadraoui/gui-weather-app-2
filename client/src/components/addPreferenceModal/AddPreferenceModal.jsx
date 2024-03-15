import React, { useState, useEffect, useContext } from 'react'
import styles from "./addPreferenceModal.module.css"
import { IoMdClose } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import Axios from "axios"
import { UserContext } from "../../contexts/UserContext"

function AddPreferenceModal({ type, setModal }) {

    const { savedLocations } = useContext(UserContext)
    const [locations, setLocations] = useState([])
    const apiKey = "286326f4933546ffacd81752240103"

    const autocompleteSearch = async (e) => {
        // console.log(e.target.value)
        if(e.target.value !== ""){
            await Axios.get(`http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${e.target.value}`).then((response) => {
                console.log(response)
                setLocations(response.data)
            })
        }
    }

    const closeModal = () => {
        setModal(false)
        for(let item in savedLocations){
            savedLocations.pop(item)
        }
    }

    const addLocation = (item) => {
        setLocations([])
        if(!(item in savedLocations)){
            savedLocations.push(item)
        }
        console.log(savedLocations)
    }


  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <h4>Add {type}</h4>
            <IoMdClose className={styles.closeButton} onClick={closeModal} />
        </div>
        <div className={styles.content}>
            <div className={styles.searchWrapper}>
                <div className={styles.search}>
                    <input type="text" placeholder={`search for a ${type}`} onChange={autocompleteSearch}/>
                    <IoSearch />
                </div>
                {locations.length > 0 && (
                    <div className={styles.searchResults}>
                        <div className={styles.searchResultContainer}>
                            {locations.map((item, idx) => {
                                return (
                                    <div className={styles.searchItem} onClick={() => addLocation(item)}>
                                        <p>{item.name}, {item.region}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
                
            </div>
            <div className={styles.savedPreference}>
                {savedLocations.map((item, idx) => {
                    return <p>{item.name}, {item.region}</p>
                })}
            </div>
        </div>
    </div>
  )
}

export default AddPreferenceModal