import React from 'react';

function UnitDetails({unit}) {
    let unitId = unit.id;
    if (unitId >= 20) {
        unitId = 20;
    }
    return (
        <>
            <img src={`units/${unitId}.gif`} alt='' />
        </>
    );
}

export default UnitDetails;