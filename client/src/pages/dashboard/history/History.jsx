import React, { useState, useEffect } from 'react'
import styles from "./history.module.css"
import Axios from "axios"

function History() {
  const apiKey = "286326f4933546ffacd81752240103"
  const currentDate = new Date().toISOString().slice(0, 10)
  const [date, setDate] = useState(currentDate)
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    date: null,
    precipitation: null,
    humidity: null,
    wind: null
  })

  useEffect(() => {
    const fetchWeather = async () => {
      await Axios.get(`http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=London&dt=${date}`).then((response) => {
        console.log(response)
        console.log(date)
        setWeatherData({
          temperature: response.data.forecast.forecastday[0].day.maxtemp_c,
          date: response.data.forecast.forecastday[0].date,
          precipitation: response.data.forecast.forecastday[0].day.totalprecip_in,
          humidity: response.data.forecast.forecastday[0].day.avghumidity,
          wind: response.data.forecast.forecastday[0].day.maxwind_kph,
          icon: response.data.forecast.forecastday[0].day.condition.icon
        })
      })
    }
    fetchWeather()
  }, [date])
  
  return (
    <div className={styles.container}>
      <div className={styles.searchDate}>
        <h3>Date</h3>
        <input type="date" onChange={((e) => setDate(e.target.value))}/>
      </div>
      <div className={styles.weatherComponents}>
      <div className={styles.summaryWeather}>
            <div className={styles.top}>
              <h6>{weatherData?.date}</h6>
              {/* <h6>{weatherData?.time}</h6> */}
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
      </div>
    </div>
  )
}

export default History