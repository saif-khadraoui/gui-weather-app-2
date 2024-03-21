import React, { useState, useEffect, useContext } from 'react'
import styles from "./home.module.css"
import { IoSearch } from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import Axios from "axios";
import useGeolocation from "react-hook-geolocation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../../contexts/UserContext';
import LocationSelector from '../../../components/locationSelector/LocationSelector';


function Home() {


  const geolocation = useGeolocation()
  const userId = localStorage.getItem("userId")

  // get the days of the week so the weekly weather loops through them
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  // get the current date
  const d = new Date().getDay()
  const currentDay = days[d]

  // state
  const {toastState, setToastState} = useContext(UserContext)
  const [position, setPosition] = useState();
  const [location, setLocation] = useState("")
  const [crops, setCrops] = useState([])
  const [chosenLocation, setChosenLocation] = useState("")
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    time: null,
    precipitation: null,
    humidity: null,
    wind: null
  })
  const [locations, setLocations] = useState([])
  const [weeklyWeather, setWeeklyWeather] = useState([])
  const [dayWeather, setDayWeather] = useState([])

  // calls the search weather function when the user enters search
  const enterSearch = async (event) => {
    if (event.key == "Enter"){
      await searchWeather(location)
    }
  }

  // gets the weather data
  const searchWeather = async (location) => {
    setChosenLocation(location)

    const apiKey = "286326f4933546ffacd81752240103"
    // await Axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`).then((response) => {
    //   console.log(response)
 
    // })

    await Axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5&aqi=no&alerts=no`).then((response) => {
      console.log(response)
      setWeatherData({
        temperature: response.data.current.temp_c,
        time: response.data.location.localtime.slice(11, response.data.location.localtime.length),
        precipitation: response.data.current.precip_in,
        humidity: response.data.current.humidity,
        wind: response.data.current.wind_kph,
        icon: response.data.current.condition.icon
      })
      setWeeklyWeather(response.data?.forecast?.forecastday)
      setDayWeather(response.data?.forecast?.forecastday[0].hour)
      if(response.data.current.wind_kph > 10 && response.data.current.wind_kph < 30){
        toast("It isn't too windy in this location, crops here should be safe")
      }
    

    })


  }

  // gets the current weather
  const getCurrentWeather = async (latitude, longitude) => {
    const apiKey = "286326f4933546ffacd81752240103"

    await Axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude}, ${longitude}&days=5&aqi=no&alerts=no`).then((response) => {
    //console.log(response)
    setWeatherData({
      temperature: response.data.current.temp_c,
      time: response.data.location.localtime.slice(11, response.data.location.localtime.length),
      precipitation: response.data.current.precip_in,
      humidity: response.data.current.humidity,
      wind: response.data.current.wind_kph,
      icon: response.data.current.condition.icon
    })
    //console.log(response.data?.forecast?.forecastday)
    setWeeklyWeather(response.data?.forecast?.forecastday)
    setDayWeather(response.data?.forecast?.forecastday[0].hour)
    if(toastState === false){
      if(response.data.current.wind_kph > 10 && response.data.current.wind_kph < 30){
        toast("It isn't too windy, your crops should be safe today")
      }
      setToastState(true)
    }
  })
    
  }


  // when the page renders, the current weather is fetched for the users geolocation
  useEffect(() => {
    const getCurrentLocationWeather = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
          getCurrentWeather(position.coords.latitude, position.coords.longitude)
        });
      } else {
        alert("not available")
      }

    }

    
    // gets the locations and crops the user enters in their settings
    const getLocations = async () => {
      const id = userId
      await Axios.get("http://localhost:1999/api/getProfile", {
          params: { id }
      }).then((response) => {
          console.log(response)
          setLocations(response.data[0].locations)
          setCrops(response.data[0].crops)
      })
  }

    getLocations()

    getCurrentLocationWeather()


  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.location}>
            <FaLocationArrow />
            {chosenLocation?.length > 0 ? (
              <p>{chosenLocation}</p>
            ) : (
              <>
              {position ? (
                <>
                  <p>{position.latitude}, {position.longitude}</p>
                </>
              ) : (
                <>
                <p>Loading</p>
                </>
              )}
              </>
            )}
            {/* <p>{chosenLocation ? chosenLocation : (position.latitude, position.longitude)}</p> */}
          </div>
          <div className={styles.input}>
            <input type="text" placeholder='search a city' onChange={((e) => setLocation(e.target.value))} onKeyDown={enterSearch}/>
            <IoSearch onClick={() => searchWeather(location)}/>
          </div>
          {/* <LocationSelector /> */}
          <div className={styles.locationPicker}>
            <select onChange={(e) => (searchWeather(e.target.value))}>
              <option>Select a location</option>
              {locations.map((item, idx) => {
                  return (
                      <option>{item.name}</option>
                  )
              })}
            </select>
          </div>
        </div>
        {position ? (
          <div className={styles.homeComponents}>
          <div className={styles.summaryWeather}>
          <div className={styles.top}>
            <h6>{currentDay}</h6>
            <h6>{weatherData?.time}</h6>
          </div>
          <div className={styles.middle}>
            <div className={styles.temperature}>
              <h6>{weatherData?.temperature}°</h6>
            </div>
            <div className={styles.weatherIcon}>
              {/* <MdSunny style={{ width: "90px", height: "90px" }}/> */}
              <img src={weatherData?.icon} alt='' />
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.info}>
              <p>Precipitation: <span>{weatherData?.precipitation} inches</span></p>
            </div>
            <div className={styles.info}>
              <p>Humidity: <span>{weatherData?.humidity}</span></p>
            </div>
            <div className={styles.info}>
              <p>Wind: <span>{weatherData?.wind} km/h</span></p>
            </div>
          </div>

        </div>
        <div className={styles.weeklyWeather}>
            {weeklyWeather ? (
              <>
                {weeklyWeather.map((forecastday, idx) => {
                  return (
                    <div className={styles.day}>
                      <h4>{days[(d + idx + 1) % days.length]}</h4>
                      <img src={forecastday.day.condition.icon} alt=""/>
                      <h3>{forecastday.day.avgtemp_c}°</h3>
                    </div>
                  )
                })}
              </>
            ) : (
              <>
              </>
            )}
        </div>
        <div className={styles.inDepthWeather}>
          <div className={styles.headers}>
            <h6>Time</h6>
            <h6>Temperature</h6>
            <h6>Precipitation</h6>
            <h6>Wind</h6>
          </div>
          <div className={styles.data}>
            <div className={styles.timeColumn}>
                {dayWeather.map((day, idx) => {
                  return (
                    <p>{day.time.slice(11, day.time.length)}</p>
                  )
                })}
              </div>
              <div className={styles.temperaturesColumn}>
                  {dayWeather.map((day, idx) => {
                    return (
                      <div className={styles.temperatureData}>
                        <img src={day.condition?.icon} alt=""/>
                        <p>{day.temp_c}</p>
                      </div>
                    )
                  })}
              </div>
              <div className={styles.precipitationColumn}>
                  {dayWeather.map((day, idx) => {
                    return (
                      <p>{day.precip_in} inches</p>
                    )
                  })}
              </div>
              <div className={styles.windColumn}>
                  {dayWeather.map((day, idx) => {
                    return (
                      <p>{day.wind_kph} km/h</p>
                    )
                  })}
              </div>
          </div>



        </div>
        <div className={styles.cropsTable}>
          {userId ? (
            <div className={styles.crops}>
            <table>
              <tr>
                <th>Crop</th>
                <th>Precipitation needed</th>
                <th>Humidity needed</th>
                <th>Risk</th>
              </tr>
              {crops.length > 0 ? (
                <>
                  {crops?.map((crop, idx) => {
                    return (
                      <tr>
                        <td>{crop.name}</td>
                        <td>{crop.precip_needed} inches</td>
                        <td>{crop.humidity_needed}</td>
                        <td>10</td>
                      </tr>
                    )
                  })}
                </>
              ) : (
                <p>Add some crops from your farm in settings to see more detail</p>
              )}
              
            </table>
          </div>
          ) : (
            <p>Login to see your favourite farm utilities</p>
          )}
        </div>

        </div>
        ) : (
          <p>Loading...</p>
        )}
          
          
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home