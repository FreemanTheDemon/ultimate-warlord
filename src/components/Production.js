import React from 'react';
import { unitStats } from '../unitStats';
import UnitProduction from './UnitProduction';
import './component-styles/production.css';

function Production({setProduction, setProducingW, producingW, setProducingB, producingB, player}) {
    let producing;
    if (player === 0) {
        producing = producingW;
    } else {
        producing = producingB;
    }
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
                            <UnitProduction key={i} unit={item} setProducingW={setProducingW} setProducingB={setProducingB} isSelected={isSelected} player={player} />
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
            <div className="unit-details">
                <p>{unitStats[producing.id].name}</p>
                <p>Turns: {unitStats[producing.id].time}</p>
                <p>Strength: {unitStats[producing.id].strength}</p>
                <p>Movement: {unitStats[producing.id].movement}</p>
            </div>
            <div className="button-container">
                <button onClick={() => {setProduction(false)}}>Produce</button>
            </div>
        </div>
    );
}

export default Production;