import React from 'react';
import Commodity from '../Commodity/Commodity';

const CommodityGrid = ({ data, title }) => {
    return (
        <div className={styles.container}>
            <h2>{title}</h2>
            <div className={styles.table}>
                {Object.keys(data).map((key, index) => (
                    <Commodity
                        name={data[key].name}
                        ticker={key}
                        price={data[key].Price}
                        change={data[key].Change}
                        contract={data[key].Contract}
                        time={data[key]['Time (EDT)']}
                    />
                ))}
            </div>
        </div>
    );
};

export default CommodityGrid;
