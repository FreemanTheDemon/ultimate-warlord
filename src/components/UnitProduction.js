import React from 'react';
import './component-styles/production.css';

function UnitProduction({unit, setProducing, isSelected}) {
    const { id, time } = unit;
    if (isSelected) {
        return (
            <div>
                <img className="unit border-animation" src={`units/${id}.gif`} alt='' />
            </div>
        );
    } else {
        return (
            <div>
                <img onClick={()=>{setProducing({id: id, time: time})}} className="unit" src={`units/${id}.gif`} alt='' />
            </div>
        );
    }
}

export default UnitProduction;