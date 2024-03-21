import React, { useEffect, useState } from 'react'
import styles from "./alerts.module.css"
import { FaWind } from "react-icons/fa";
import { TbUvIndex } from "react-icons/tb";
import { TiWeatherWindy } from "react-icons/ti";
import GaugeComponent from 'react-gauge-component'
import Axios from "axios"

function Alerts() {
  const userId = localStorage.getItem("userId")
  const [crops, setCrops] = useState([])
  const [locations, setLocations] = useState([])
  const [locationPicked, setLocationPicked] = useState("")
  const [weatherData, setWeatherData] = useState([])
  const [riskScore, setRiskScore] = useState(0)

  useEffect(() => {
    const getUserDetails = async () => {
      const id = userId
      await Axios.get("http://localhost:1999/api/getProfile", {
          params: { id }
      }).then((response) => {
          console.log(response)
          setLocations(response.data[0].locations)
          setCrops(response.data[0].crops)
      })
  }

    getUserDetails()
  }, [])

  const cropRiskAlgorithm = (result) => {
    // How the algorithm works
    // Assign each weather variable i.e wind, precipitation, humidity a score out of 10 for that location picked
    // Calculate the average score between the variables
    // This is for overall farm as different crops have different weather needs i.e some plant require a higher humidity, some don't

    // pressure score is calculated based on average atmospheric pressure which is 1013.25 millibars and is a ratio of the 33%
    const pressure_score = (((result.current?.pressure_mb) - 1013.25) / (result.current?.pressure_mb) * 100)  * 0.33
    console.log(((result.current?.pressure_mb) - 1013.25) / (result.current?.pressure_mb) * 100)
    console.log(pressure_score)


    // air quality score is calculated as a percentage of the highest air quality which is 10 and is a ratio of the 33%
    const air_quality_score = ((result.current?.air_quality["gb-defra-index"] / 10) * 100) * 0.33
    console.log(air_quality_score)

    // uv index is calculated as a percentage of the highest uv index which is 10 and is a ratio of the 33%
    const uv_index_score = ((result.current?.uv / 10) * 100) * 0.33
    console.log(uv_index_score)

    console.log(pressure_score + air_quality_score + uv_index_score)
    setRiskScore((pressure_score + air_quality_score + uv_index_score) / 100)

  }

  // gets the weather 
  const getWeather = async (location) => {
    const apiKey = "286326f4933546ffacd81752240103"
    await Axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5&aqi=yes&alerts=yes`).then((response) => {
      const result = response.data
      console.log(result)
      setWeatherData(result)
      cropRiskAlgorithm(result)
    })
  }


  // call the get functions to receive the weather data 
  const getAlerts = async (location) => {
    if(location == "Select a location"){
      setLocationPicked("")
    } else{
      setLocationPicked(location)
      getWeather(location)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.locationPicker}>
            <select onChange={((e) => getAlerts(e.target.value))}>
              <option>Select a location</option>
              {locations.map((item, idx) => {
                  return (
                      <option>{item.name}</option>
                  )
              })}
            </select>
          </div>
      <div className={styles.widgets}>
        <div className={styles.left}>
          <div className={styles.top}>
            <div className={styles.cropRisk}>
              <h4>Crop risk</h4>
              <div className={styles.content}>
                {locationPicked?.length > 0 ? (
                  <div className={styles.scoreMeter}>
                    <GaugeComponent
                      id="gauge-component4"
                      type="semicircle"
                      arc={{
                        gradient: true,
                        width: 0.15,
                        padding: 0,
                        subArcs: [
                          {
                            limit: 25,
                            color: '#5BE12C',
                            showTick: true
                          },
                          {
                            limit: 50,
                            color: '#F5CD19',
                            showTick: true
                          },
                          {
                            limit: 75,
                            color: '#F5CD19',
                            showTick: true
                          },
                          {
                            limit: 100,
                            color: '#EA4228',
                            showTick: true
                          },
                          { color: '#EA4228' }
                        ]
                      }}
                      value={riskScore}
                      pointer={{type: "arrow", elastic: true}}
                    />
                  </div>
                ) : (
                  <p>Please choose a location to see the risk on crops</p>
                )}
              </div>
            </div>
            <div className={styles.stats}>
              <div className={styles.statInfo}>
                <FaWind style={{ width: "30px", height: "30px" }}/>
                <div className={styles.airQuality}>
                  <h5>Air quality</h5>
                  {(weatherData?.current?.air_quality) ? (
                    <h5>{weatherData?.current.air_quality["gb-defra-index"]}</h5>
                  ) : (
                    <p>Pick a location</p>
                  )}
                </div>
              </div>
              <div className={styles.statInfo}>
                <TiWeatherWindy style={{ width: "30px", height: "30px" }}/>
                  <div className={styles.pressure}>
                    <h5>Pressure</h5>
                    {(weatherData?.current?.pressure_mb) ? (
                      <h5>{weatherData?.current?.pressure_mb}</h5>
                    ) : (
                      <p>Pick a location</p>
                    )}
                  </div>
              </div>
              <div className={styles.statInfo}>
                <TbUvIndex style={{ width: "30px", height: "30px" }}/>
                <div className={styles.uv}>
                    <h5>UV Index</h5>
                    {(weatherData?.current?.uv) ? (
                      <h5>{weatherData?.current?.uv}</h5>
                    ) : (
                      <p>Pick a location</p>
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
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
          </div>
        </div>
        <div className={styles.right}>
          <h4>Live warnings</h4>
          <div className={styles.liveAlerts}>
            {locationPicked?.length > 0 ? (
              <>
                {weatherData?.alerts?.alert.length > 0 ? (
                    <p>alerts</p>
                  ) : (
                    <p>There are currently no alerts for this location</p>
                  )}
              </>
            ) : (
              <p>Please choose a location to see alerts</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Alerts