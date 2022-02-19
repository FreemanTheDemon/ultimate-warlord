import React from 'react';
import './component-styles/tile.css';

function Unit({unit, x, y, selectUnit, isSelected}) {
    // selected: outline: '2px dashed yellow', outlineOffset: '-2px'
    if (isSelected) {
        return (
            <div className="border-animation unit-container" style={{top: `calc(${x} * 48px)`, left: `calc(${y} * 48px)`}}>
                <img onClick={()=>{selectUnit(x, y)}} className="unit" src={unit} alt='' />
            </div>
        );
    } else {
        return (
            <div className="unit-container" style={{top: `calc(${x} * 48px)`, left: `calc(${y} * 48px)`}}>
                <img onClick={()=>{selectUnit(x, y)}} className="unit" src={unit} alt='' />
            </div>
        );
    }
}

export default Unit;