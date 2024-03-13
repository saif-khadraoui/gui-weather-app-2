import React from 'react'
import styles from "./alerts.module.css"
import { FaWind } from "react-icons/fa";

function Alerts() {
  return (
    <div className={styles.container}>
      <div className={styles.widgets}>
        <div className={styles.left}>
          <div className={styles.top}>
            <div className={styles.cropRisk}>

            </div>
            <div className={styles.stats}>
              <div className={styles.statInfo}>
                <FaWind style={{ width: "30px", height: "30px" }}/>
                <div className={styles.airQuality}>
                  <h5>Air quality</h5>
                  <h5>95%</h5>
                </div>
              </div>
              <div className={styles.statInfo}>
                <FaWind style={{ width: "30px", height: "30px" }}/>
                  <div className={styles.soilMoisture}>
                    <h5>Soil moisture</h5>
                    <h5>95%</h5>
                  </div>
              </div>
              <div className={styles.statInfo}>
                
              </div>
            </div>
          </div>
          <div className={styles.bottom}>

          </div>
        </div>
        <div className={styles.right}>
          <h5>Live warnings</h5>
        </div>
      </div>
    </div>
  )
}

export default Alerts