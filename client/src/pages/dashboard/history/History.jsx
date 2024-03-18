import React, { useState, useEffect } from 'react'
import styles from "./history.module.css"
import Axios from "axios"
// import { DateRangePicker } from 'react-date-range';
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
  const [dayWeather, setDayWeather] = useState([])

  const fetchWeather = async (datePicked) => {
    await Axios.get(`http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=London&dt=${datePicked}`).then((response) => {
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
      setDayWeather(response.data?.forecast?.forecastday[0].hour)
    })
  }

  useEffect(() => {
    
    fetchWeather()
  }, [date])

  const searchDate = async () => {
    console.log(date)
    const datePicked = date["$y"] + "-" + date["$m"] +  (String(parseInt(date["$M"]) + 1)) + "-" + ((parseInt(date["$D"]) < 10) ? "0" + date["$D"] :  date["$D"]) 
    console.log(datePicked)
    fetchWeather(datePicked)
  }

  
  return (
    <div className={styles.container}>
      <div className={styles.searchDate}>
        <div className={styles.dateRange}>
          <div className={styles.dateOption}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <h4>Pick a date</h4>
              <DatePicker onChange={((e) => setDate(e))}/>
            </LocalizationProvider>
          </div>
          {/* <div className={styles.dateOption}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <h4>To</h4>
              <DatePicker />
            </LocalizationProvider>
          </div> */}
        </div>
        <div className={styles.button}>
          <button onClick={searchDate}>Search</button>
        </div>
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
          
      </div>
    </div>
  )
}

export default History