import React from 'react';
import UnitDetails from './UnitDetails';

function Details({selectedUnit, setSelectedUnit}) {
    if (selectedUnit.id === null) {
        return (
            <div>
                <p>
                    nothing selected
                </p>
            </div>
        )
    } else {
        const {units, team} = selectedUnit;
        return (
            <div>
                <p>
                    Player {team + 1}
                </p>
                {units.map((item, i) => {
                    return (
                        <UnitDetails unit={item} />
                    );
                })}
            </div>
        );
    }
}

export default Details;