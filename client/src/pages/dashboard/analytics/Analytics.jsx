import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styles from "./analytics.module.css"
import CommodityGrid from '../../../components/CommodityGrid/CommodityGrid';

function Analytics() {
    const commodityEmojis = {
      'Corn (CBOT)': '🌽',
      'Wheat (CBOT)': '🌾',
      'Oats (CBOT)': '🌾',
      'Rough Rice (CBOT)': '🌾',
      'Soybean (CBOT)': '🌱',
      'Soybean Meal (CBOT)': '🥗',
      'Soybean Oil (CBOT)': '🥢',
      'Canola (ICE)': '🌱',
      'Cocoa (ICE)': '🍫',
      'Coffee \'C\' (ICE)': '☕️',
      'Sugar #11 (ICE)': '🍚',
      'Orange Juice (ICE)': '🍊',
      'Cotton #2 (ICE)': '👕',
      'Wool (ASX)': '🐑',
      'Lumber (CME)': '🪵',
      'Rubber (Singapore)': '🚗',
      'Ethanol (CBOT)': '🛢️',
      'Live Cattle (CME)': '🐄',
      'Feeder Cattle (CME)': '🐄',
      'Lean Hogs (CME)': '🐖'
    };


  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://bloomberg-api.p.rapidapi.com/bloomberg/agriculture',
          headers: {
            'X-RapidAPI-Key': '72a672a52emshff6bdbaef7446cfp1640dcjsn1e45b8a6fea9',
            'X-RapidAPI-Host': 'bloomberg-api.p.rapidapi.com'
          }
        };
        const response = await axios.request(options);
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // The empty array means this effect runs once after the initial render

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;



  return (
    <div className={styles.container}>
      <h3>Common commodities</h3>
      {/* <CommodityGrid title="Actual Prices" data={data} /> */}
      <div className={styles.table}>
        <table>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Change</th>
            <th>Time checked</th>
          </tr>
          {/* <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>Germany</td>
          </tr> */}
          {Object.keys(data).map((row, idx) => {
            return (
              <tr>
                <td>{data[row].name} {commodityEmojis[data[row].name]}</td>
                <td>{data[row].Price}</td>
                <td style={{ display: "flex", gap: "10px", alignItems: "center" }}>{data[row].Change} {data[row].Change > 0 ? <p style={{ color: "green" }}>▲</p> : <p style={{ color: "red" }}>▼</p>}</td>
                <td>{data[row]['Time (EDT)']}</td>
              </tr>
            )
          })}
        </table>
      </div>
    </div>
  );
}

export default Analytics