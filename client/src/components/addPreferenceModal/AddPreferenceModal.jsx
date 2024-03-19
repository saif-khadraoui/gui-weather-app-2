import React, { useState, useEffect, useContext } from 'react'
import styles from "./addPreferenceModal.module.css"
import { IoMdClose } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import Axios from "axios"
import { UserContext } from "../../contexts/UserContext"
import Crops from "./Crops"

function AddPreferenceModal({ type, setModal }) {

    const { savedLocations, setSavedLocations, savedCrops, setSavedCrops } = useContext(UserContext)
    const [result, setResult] = useState([])
    const apiKey = process.env.API_KEY
    const userId = localStorage.getItem("userId")

    const autocompleteSearch = async (e) => {
        // console.log(e.target.value)
        if(type == "location" && e.target.value !== ""){
            await Axios.get(`http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${e.target.value}`).then((response) => {
                console.log(response)
                setResult(response.data)
            })
        } else if (type == "crop" && e.target.value !== ""){
            const wordEntered = e.target.value;
            const filteredResult = Crops.filter((crop) => {
                return crop.includes(wordEntered)
            })
            // console.log(filteredResult)
            setResult(filteredResult)
        }
    }

    const closeModal = () => {
        setModal(false)
        // for(let item in savedLocations){
        //     savedLocations.pop(item)
        // }
        setSavedLocations([])
        setSavedCrops([])
    }

    const addSavedPreference = (item) => {
        setResult([])


        // savedLocations.push(item)
        if(type == "location"){
            for(let i=0; i<=savedLocations.length-1; i++){
                if(savedLocations[i].id == item.id){
                    alert("location already added")
                    return
                }
            }
            setSavedLocations(prev => [...prev, item])
        } else{
            for(let i=0; i<=savedCrops.length-1; i++){
                if(savedCrops[i] == item){
                    alert("location already added")
                    return
                }
            }
            setSavedCrops(prev => [...prev, item])
        }

        // if(savedLocations.indexOf(item) >= 0){
        // } else{
            
        // }
        console.log(savedLocations, savedCrops)
    }

    const deleteSavedPreference = (itemId) => {
        console.log(itemId)
        console.log(savedLocations, savedCrops)



        if(type == "location"){
            setSavedLocations(prev => prev.filter((item) => item.id !== itemId))
        } else{
            setSavedCrops(prev => prev.filter((item) => item.id !== itemId))
        }
        
        // for(let i=0; i<=savedLocations.length-1; i++){
        //     if(savedLocations[i].id == itemId){
        //         savedLocations.pop(i)
        //     }
        // }
    }

    const savePreference = async () => {
        console.log(savedLocations)
        if(type == "location"){
            await Axios.post("http://localhost:1999/api/updateLocationPreference", {
                userId: userId,
                savedLocations: savedLocations
            }).then((response) => {
                console.log(response)
            })
        } else{
            console.log(savedCrops)
            await Axios.post("http://localhost:1999/api/updateCropPreference", {
                userId: userId,
                savedCrops: savedCrops
            }).then((response) => {
                console.log(response)
            })
        }
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
                {result.length > 0 && (
                    <div className={styles.searchResults}>
                        <div className={styles.searchResultContainer}>
                            {type == "location" && (
                                <>
                                    {result.map((item, idx) => {
                                    return (
                                        <div className={styles.searchItem} onClick={() => addSavedPreference(item)}>
                                            <p>{item.name}, {item.region}</p>
                                        </div>
                                        )
                                    })}
                                </>
                            )}

                            {type == "crop" && (
                                <>
                                    {result.map((item, idx) => {
                                        return (
                                            <div className={styles.searchItem} onClick={() => addSavedPreference(item)}>
                                                <p>{item}</p>
                                            </div>
                                        )
                                    })}
                                </>
                            )}
                        
                        </div>
                    </div>
                )}
                
            </div>
            <div className={styles.savedPreference}>
                {type == "location" && (
                    <>
                        {savedLocations.map((item, idx) => {
                            return (
                                <div className={styles.savedItem}>
                                    <p>{item.name}, {item.region}</p>
                                    <IoMdClose style={{ cursor: "pointer" }} onClick={() => deleteSavedPreference(item.id)}/>
                                </div>
                            )
                        })}
                    </>
                )}

                {type == "crop" && (
                    <>
                        {savedCrops.map((item, idx) => {
                            return (
                                <div className={styles.savedItem}>
                                    <p>{item}</p>
                                    <IoMdClose style={{ cursor: "pointer" }} onClick={() => deleteSavedPreference(item.id)}/>
                                </div>
                            )
                        })}
                    </>
                )}
            </div>
            <div className={styles.button}>
                <button onClick={savePreference}>Save</button>
            </div>
        </div>
    </div>
  )
}

export default AddPreferenceModal