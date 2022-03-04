import React from 'react';
import UnitDetails from './UnitDetails';
import './component-styles/details.css'

function Details({selectedUnit, turn}) {
    if (selectedUnit.id === null) {
        return (
            <div>
                <p>
                    Player {turn + 1}'s turn
                </p>
            </div>
        )
    } else {
        if (selectedUnit.id === null) {
            return null;
        }
        const { units } = selectedUnit;
        return (
            <div className="units">
                {units.map((item, i) => {
                    return (
                        <UnitDetails unit={item} key={i} />
                    );
                })}
            </div>
        );
    }
}

export default Details;