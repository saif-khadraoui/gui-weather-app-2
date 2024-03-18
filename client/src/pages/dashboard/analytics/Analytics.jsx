import React from 'react'
import styles from "./analytics.module.css"
import CommodityGrid from '../../../components/CommodityGrid/CommodityGrid';

function Analytics() {
  const historicalData = [
    { name: 'Wheat', price: 90, previousPrice: null, ticker: 'WHT' },
    { name: 'Corn', price: 40, previousPrice: null, ticker: 'CL' },
    { name: 'Cocoa', price: 180, previousPrice: null, ticker: 'COC' }
  ];

  const predictionsData = [
    { name: 'Wheat', price: 92, previousprice: 90, ticker: 'WHT' },
    { name: 'Corn', price: 38, previousprice: 40, ticker: 'CL' },
    { name: 'Cocoa', price: 180, previousprice: 180, ticker: 'COC' }
  ];

  const actualData = [
    { name: 'Wheat', price: 89, previousprice: 90, ticker: 'WHT' },
    { name: 'Corn', price: 50, previousprice: 40, ticker: 'CL' },
    { name: 'Cocoa', price: 180, previousprice: 180, ticker: 'COC' }
  ];



  return (
    <div className="app">
      <h1>Commodity Prices</h1>
      <CommodityGrid title="Historical Data" data={historicalData} />
      <CommodityGrid title="Predictions" data={predictionsData} />
      <CommodityGrid title="Actual Prices" data={actualData} />
    </div>
  );
}

export default Analytics