import React, { useState } from 'react';

function UnitDetails({unit}) {
    let unitId = unit.id;
    if (unitId >= 20) {
        unitId = 20;
    }
    return (
        <>
            <img src={`units/${unitId}.gif`} alt='' />
            {/* <input type="checkbox" checked={checked} onChange={()=>{setSelectedUnit(fullUnitCopy); setChecked(!checked);}} /> */}
        </>
    );
}

export default UnitDetails;