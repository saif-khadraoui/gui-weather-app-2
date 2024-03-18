import React from 'react';
import Commodity from '../Commodity/Commodity';

const CommodityGrid = ({ data, title }) => {
    return (
        <div className="commodity-grid">
            <h2>{title}</h2>
            <div className="grid-container">
                {data.map((commodity, index) => (
                    <Commodity
                        key={index}
                        name={commodity.name}
                        ticker={commodity.ticker}
                        price={commodity.price}
                        previousPrice={commodity.previousprice}
                    />
                ))}
            </div>
        </div>
    );
};

export default CommodityGrid;
