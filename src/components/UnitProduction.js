import React from 'react';
import './component-styles/production.css';

function UnitProduction({unit, setProducingW, setProducingB, isSelected, player}) {
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
                <img onClick={()=>{if(player === 0) {setProducingW({id: id, time: time})} else {setProducingB({id: id, time: time})}}} className="unit" src={`units/${id}.gif`} alt='' />
            </div>
        );
    }
}

export default UnitProduction;