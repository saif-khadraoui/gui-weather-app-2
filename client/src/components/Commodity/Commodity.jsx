import React from 'react';

const Commodity = ({ name, ticker, price, change, contract, time }) => {
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
      


    let indicator = '';
    let color = ''
    if (change) {
        if (change > 0) {
            indicator = '▲';
            color = 'green';
        } else if (change < 0) {
            indicator = '▼';
            color = 'red';
        } else {
            indicator = '-'
            color = 'grey'
        }
    }

    return (
        <div className="commodity-box">
            <div className="commodity">
                <span>{commodityEmojis[name]}</span>
                <span>{name}</span>
                <span>Price: {price} {change}</span>
                <span>{time}</span>
                {<span style={{ color: color }}> {indicator}</span>}
            </div>
        </div>
    );
};

export default Commodity;
