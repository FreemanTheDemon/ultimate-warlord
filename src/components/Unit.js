import React from 'react';
import './component-styles/tile.css';

function Unit({unit, x, y, selectUnit, isSelected}) {
    // {units: [{id: 21, moving: false}, {id: 2, moving: true}, {id: 2, moving: false}, {id: 4, moving: true}], team: 2, x: 2, y: 2}
    const colors = ['red', 'yellow', 'blue'];
    let unitColor = colors[unit.team];
    let unitId = unit.units[0].id;
    let unitNum = unit.units.length;
    for (let i = 0; i < unit.units.length; i++) {
        if (unit.units[i].id < unitId && unitId < 20) {
            unitId = unit.units[i].id;
        } else if (unit.units[i].id >= 20) {
            unitId = 20;
        }
    }

    if (isSelected) {
        return (
            <div className="border-animation unit-container" style={{top: `calc(${x} * 48px)`, left: `calc(${y} * 48px)`}}>
                <p className="unit-num" style={{color: unitColor}}>{unitNum}</p>
                <img onClick={()=>{selectUnit(unit)}} className="unit" src={`units/${unitId}.gif`} alt='' />
            </div>
        );
    } else {
        return (
            <div className="unit-container" style={{top: `calc(${x} * 48px)`, left: `calc(${y} * 48px)`}}>
                <p className="unit-num" style={{color: unitColor}}>{unitNum}</p>
                <img onClick={()=>{selectUnit(unit)}} className="unit" src={`units/${unitId}.gif`} alt='' />
            </div>
        );
    }
}

export default Unit;