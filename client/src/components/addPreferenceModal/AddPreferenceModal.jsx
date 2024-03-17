import React, { useState, useEffect, useContext } from 'react'
import styles from "./addPreferenceModal.module.css"
import { IoMdClose } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import Axios from "axios"
import { UserContext } from "../../contexts/UserContext"

function AddPreferenceModal({ type, setModal }) {

    const { savedLocations, setSavedLocations } = useContext(UserContext)
    // const [savedLocationsState, setSavedLocationsState] = useState(savedLocations)
    const [locations, setLocations] = useState([])
    const apiKey = "286326f4933546ffacd81752240103"
    const userId = localStorage.getItem("userId")

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
        // for(let item in savedLocations){
        //     savedLocations.pop(item)
        // }
        setSavedLocations([])
    }

    const addLocation = (item) => {
        setLocations([])

        for(let i=0; i<=savedLocations.length-1; i++){
            if(savedLocations[i].id == item.id){
                alert("location already added")
                return
            }
        }

        // savedLocations.push(item)
        setSavedLocations(prev => [...prev, item])

        // if(savedLocations.indexOf(item) >= 0){
        // } else{
            
        // }
        console.log(savedLocations)
    }

    const deleteSavedPreference = (itemId) => {
        console.log(itemId)
        console.log(savedLocations)


        setSavedLocations(prev => prev.filter((item) => item.id !== itemId))
        
        // for(let i=0; i<=savedLocations.length-1; i++){
        //     if(savedLocations[i].id == itemId){
        //         savedLocations.pop(i)
        //     }
        // }
    }

    const savePreference = async () => {
        console.log(savedLocations)
        await Axios.post("http://localhost:1999/api/updateLocationPreference", {
            userId: userId,
            savedLocations: savedLocations
        }).then((response) => {
            console.log(response)
        })
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
                    return (
                        <div className={styles.savedItem}>
                            <p>{item.name}, {item.region}</p>
                            <IoMdClose style={{ cursor: "pointer" }} onClick={() => deleteSavedPreference(item.id)}/>
                        </div>
                    )
                })}
            </div>
            <div className={styles.button}>
                <button onClick={savePreference}>Save</button>
            </div>
        </div>
    </div>
  )
}

export default AddPreferenceModal