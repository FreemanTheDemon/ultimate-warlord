import React from 'react';
import { unitStats } from '../unitStats';
import UnitProduction from './UnitProduction';
import './component-styles/production.css';

function Production({setProduction, setProducing, producing}) {
    
    // check which team's turn it is
    return (
        <div className="production-container">
            <div className="units">
                {unitStats.map((item, i) => {
                    let isSelected = false;
                    if (producing.id === item.id) {
                        isSelected = true;
                    }
                    if (item.canProduce) {
                        return (
                            <UnitProduction key={i} unit={item} setProducing={setProducing} isSelected={isSelected} />
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
            <button onClick={() => {setProduction(false)}}>Produce</button>
        </div>
    );
}

export default Production;