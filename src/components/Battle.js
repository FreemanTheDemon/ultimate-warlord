import React from 'react';
import UnitBattle from './UnitBattle';
import './component-styles/battle.css';

function Battle({attacker, defender, setBattle, deathOrder}) {
    let attackingUnits = attacker.units;
    let defendingUnits = defender.units;

    setTimeout(() => {
        setBattle(false);
    }, 5000)

    let attDeath = [];
    let defDeath = [];
    for (let i = 1; i < deathOrder.length + 1; i++) {
        if (deathOrder[i - 1][1] === 'att') {
            attDeath.push([deathOrder[i - 1][0].unique, i]);
        } else {
            defDeath.push([deathOrder[i - 1][0].unique, i]);
        }
    }

    return (
        <div className="battle-container">
            <div className="fight-box">
                {defendingUnits.map((item) => {
                    let destroy = 0;
                    for (let i = 0; i < defDeath.length; i++) {
                        if (defDeath[i][0] === item.unique) {
                            destroy = defDeath[i][1];
                            break;
                        }
                    }
                    return (
                        <UnitBattle unit={item} destroy={destroy} key={item.unique}/>
                    );
                })}
            </div>
            <div className="fight-box">
                {attackingUnits.map((item) => {
                    let destroy = 0;
                    for (let i = 0; i < attDeath.length; i++) {
                        if (attDeath[i][0] === item.unique) {
                            destroy = attDeath[i][1];
                            break;
                        }
                    }
                    return (
                        <UnitBattle unit={item} destroy={destroy} key={item.unique}/>
                    );
                })}
            </div>
        </div>
    );
}

export default Battle;