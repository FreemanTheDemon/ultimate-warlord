import React from 'react';
import './component-styles/battle.css';

function Battle({attacker, defender, setDefender, setSelectedUnit, setBattle}) {
    let attackingUnits = attacker.units;
    let defendingUnits = defender.units;

    setTimeout(() => {
        setBattle(false);
    }, 5000)

    return (
        <div className="battle-container">
            <div className="fight-box">
                {defendingUnits.map((item) => {
                    let itemId = item.id;
                    if (item.id > 20) {
                        itemId = 20;
                    }
                    return (
                        <img src={`units/${itemId}.gif`} alt='' />
                    );
                })}
            </div>
            <div className="fight-box">
                {attackingUnits.map((item) => {
                    let itemId = item.id;
                    if (item.id > 20) {
                        itemId = 20;
                    }
                    return (
                        <img src={`units/${itemId}.gif`} alt='' />
                    );
                })}
            </div>
        </div>
    );
}

export default Battle;