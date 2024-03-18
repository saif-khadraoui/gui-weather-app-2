import React from 'react';

const Commodity = ({ name, ticker, price, previousPrice }) => {
    const commodityEmojis = {
        Wheat: '🌾',
        Corn: '🌽',
        Rice: '🌾',
        Soybeans: '🌱',
        Barley: '🌾',
        Oats: '🌾',
        Cotton: '🌱',
        Sugar: '🍚',
        Coffee: '☕️',
        Cocoa: '🍫',
        Tea: '🍵',
        Tobacco: '🚬',
        PalmOil: '🌴🛢️',
        Canola: '🌱',
        Sorghum: '🌾'
      };
      

    let indicator = '';
    let color = ''
    if (previousPrice) {
        if (price > previousPrice) {
            indicator = '▲';
            color = 'green';
        } else if (price < previousPrice) {
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
                <span>{name} ({ticker}) </span>
                <span>£{price}</span>
                {<span style={{ color: color }}> {indicator}</span>}
            </div>
        </div>
    );
};

export default Commodity;
