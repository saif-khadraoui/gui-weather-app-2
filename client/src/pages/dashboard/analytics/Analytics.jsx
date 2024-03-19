import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styles from "./analytics.module.css"
import CommodityGrid from '../../../components/CommodityGrid/CommodityGrid';

function Analytics() {
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
    <div className="app">
      <h1>Commodity Prices</h1>
      <CommodityGrid title="Actual Prices" data={data} />
    </div>
  );
}

export default Analytics