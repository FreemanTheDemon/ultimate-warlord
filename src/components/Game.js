import React, { useState, useRef, useEffect } from 'react';
import './component-styles/game.css'
import Tile from './Tile';
import Unit from './Unit';
import Battle from './Battle';
import Details from './Details';
import { unitStats } from '../unit-stats';

let turn = 0;

const grid = [
    ['d_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs'],
    ['d_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b'],
    ['d_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs'],
    ['d_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b'],
    ['d_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs'],
    ['d_b', 'd_bs', 'd_b', 'cw_nw_d', 'cw_ne_d', 'd_bs', 'dm_g_e', 'dm_g', 'dm_g', 'dm_g', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b'],
    ['d_bs', 'd_b', 'd_bs', 'cw_sw_d', 'cw_se_d', 'd_t_g', 'dm_g_e', 'dm_g', 'dm_g', 'dm_g', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs'],
    ['d_b', 'd_bs', 'd_b', 'd_bs', 'd_t_g', 'dm_g_se', 'dm_g_se_b', 'dm_g', 'dm_g', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b'],
    ['d_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'dm_g_e', 'dm_g', 'dm_g', 'dm_g', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'cb_nw_d', 'cb_ne_d', 'd_bs', 'd_b', 'd_bs'],
    ['d_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'dm_g_ne', 'dm_g_ne_b', 'dm_g', 'dm_g', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'cb_sw_d', 'cb_se_d', 'd_b', 'd_bs', 'd_b'],
    ['d_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'dm_g_ne', 'dm_g_n', 'dm_g_n', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs'],
    ['d_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b'],
    ['d_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs'],
    ['d_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b'],
    ['d_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs'],
    ['d_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b', 'd_bs', 'd_b'],
];
// 37 x 17

let units = [
    ['', '', '', '', '', {units: [{id: 3, moving: true, movement: 5, unique: 1}, {id: 4, moving: true, movement: 5, unique: 2}, {id: 4, moving: true, movement: 5, unique: 3}, {id: 5, moving: true, movement: 5, unique: 4},], team: 'd_bs', x: 0, y: 5}, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', {units: [{id: 2, moving: true, movement: 5, unique: 5}], team: 0, x: 3, y: 4}, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', {units: [{id: 24, moving: true, movement: 5, unique: 6}], team: 1, x: 5, y: 8}, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
];

// up to 8 units
// let unitsTable = [{bag: ['item1', 'item2'], id: 20}, {bag: ['item3', 'item4'], id: 21}];

// let bags = [[]];

function Game() {
    const didMount = useRef(false);
    const [selectedUnit, setSelectedUnit] = useState({id: null}); // {units: [{id: NUM, moving: BOOL}], team: NUM, x: NUM, y: NUM}
    const [defender, setDefender] = useState({id: null});
    const [battle, setBattle] = useState(false);
    const [defenderWins, setDefenderWins] = useState(null);
    const [deathOrder, setDeathOrder] = useState([]);
    
    useEffect(() => {
        const listener = event => {
            if (event.code === "KeyD") {
                event.preventDefault();
                deselectUnit();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, []);

    function deselectUnit() {
        setSelectedUnit({id: null});
    }

    function moveUnit(x, y) {
        if (selectedUnit.id !== null) {
            // compare current coordinates to target coordinates
            //  m=(y2-y1)/(x2-x1)
            let slopeX = (y - selectedUnit.y);
            let slopeY = (x - selectedUnit.x);
            if (slopeX > 1 || slopeX < -1 || slopeY > 1 || slopeY < -1 ) {
                return;
            }

            // each time the unit moves, check the next block in its path and decide what to do with it

            // if a unit/enemy castle is at the destination...
            // if (units[x][y] !== '' && units[x][y].team !== selectedUnit.team) {
            //     console.log('attack');
            // }
                // get the unit that is at the x and y position
                // if the unit is friendly and the combintaion of the units are less than or equal to 8, then merge them
                    // if we can't merge, just stop right next to the unit
                // if the unit is unfriendly, setBattle to true and setEnemy (create new useState) to the unit object at that location
                    // I suppose we return undefined in this case and let the battle component handle the rest
                    // if an enemy or enemy castle gets in the way, stop moving


            // copy the unit - change this to only copy only units with moving === true
            let unit = Object.assign({}, units[selectedUnit.x][selectedUnit.y]);
            let stayingUnit = Object.assign({}, units[selectedUnit.x][selectedUnit.y]);
            let moving = [];
            let staying = [];
            // sort out which units are moving and which are staying
            for (let i = 0; i < unit.units.length; i++) {
                if (unit.units[i].moving === true) {
                    moving.push(unit.units[i]);
                } else {
                    staying.push(unit.units[i]);
                }
            }
            // break the function of no unit is moving
            if (moving.length === 0) {
                return;
            }
            // reassign the units that are moving
            unit.units = moving;

            // clear the unit - change this to instead delete unmoved unit data in that position
            if (staying.length === 0) {
                units[selectedUnit.x][selectedUnit.y] = '';
            } else {
                stayingUnit.units = staying;
                units[selectedUnit.x][selectedUnit.y] = stayingUnit;
            }

            // set the new x and y values
            unit.x = x;
            unit.y = y;
            // set the selected unit
            // move the unit to the new position
            setSelectedUnit(unit);
            units[x][y] = unit;
        }
    }

    function attackUnit(x, y) {
        let slopeX = (y - selectedUnit.y);
        let slopeY = (x - selectedUnit.x);
        if (slopeX > 1 || slopeX < -1 || slopeY > 1 || slopeY < -1 ) {
            return;
        }
        
        setDefender(units[x][y]);
        
        let attackerArr = [...selectedUnit.units];
        let defenderArr = [...units[x][y].units];

        let deadAttackers = 0;
        let deadDefenders = 0;

        let orderOfDeath = [];
        
        // go backwards through the units
        // compare the strength values of the first units
        // roll some "dice",
        for (let i = attackerArr.length - 1; i >= 0; i--) {
            let currentAttStr;
            if (attackerArr[i].id < 20) {
                currentAttStr = unitStats[attackerArr[i].id].strength;
            } else {
                currentAttStr = unitStats[15].strength; //
            }
            let defPos = 0;
            let posCounter = 0;
            for (let j = defenderArr.length - (1 + defPos); j >= 0; j--) {
                let currentDefStr;
                if (defenderArr[i].id < 20) {
                    currentDefStr = unitStats[defenderArr[i].id].strength;
                } else {
                    currentDefStr = unitStats[15].strength;
                }
                let attOrDef = null; // att won = true def won = false;
                while (attOrDef === null) {
                    let def = currentDefStr + Math.floor(Math.random() * 10) + 1;
                    let att = currentAttStr + Math.floor(Math.random() * 10) + 1;
                    if (att > def) {
                        attOrDef = true;
                        deadDefenders++;
                        orderOfDeath.push([defenderArr[j], 'def']);
                        // take the defending unit and store it (attacker won)
                    } else if (def > att) {
                        attOrDef = false;
                        deadAttackers++;
                        orderOfDeath.push([attackerArr[i], 'att']);
                        // take the attacking unit and store it (attacker lost)
                    }
                }
                posCounter++
                if (!attOrDef) {
                    // if the attacker lost
                    // we break so that we move onto the next attacker
                    // save the value of the defender we are at
                    defPos = posCounter;
                    break;
                }
                // otherwise we continue as per usual 
            }
        }

        setDeathOrder(orderOfDeath);

        // if the attacker wins, move the attacker to the tile that was attacked
        // determine the winner with setDefenderWins
        
        if (attackerArr.length === deadAttackers) {
            defenderArr.splice(defenderArr.length - deadDefenders, deadDefenders);
            units[x][y].units = defenderArr;
            setDefenderWins(true);
        } else {
            attackerArr.splice(attackerArr.length - deadAttackers, deadAttackers);
            units[selectedUnit.x][selectedUnit.y].units = attackerArr;
            setDefenderWins(false);
        }
        
        setBattle(true);
    }

    useEffect(() => {
        if (didMount.current) {
            if (battle === false && defender.id !== null) {
                if (defenderWins) {
                    // delete the attacker, clear the defender, clear selected unit
                    units[selectedUnit.x][selectedUnit.y] = '';
                    setDefender({id: null});
                    setSelectedUnit({id: null});
                } else {
                    // delete the defender and move the attacker to the defender's position
                    units[defender.x][defender.y] = '';
                    moveUnit(defender.x, defender.y);
                    setSelectedUnit(units[defender.x][defender.y]);
                    setDefender({id: null})
                }
            }
        } else {
            didMount.current = true;
        }
    }, [battle]);

    return (
        <div className="game">
            <div className="map-container">
                {battle && <Battle attacker={selectedUnit} defender={defender} setBattle={setBattle} deathOrder={deathOrder} />}
                <div className="tile-container">
                    {grid.map((item, x) => {
                        return (item.map((innerItem, y) => {
                            return (
                                <Tile tile={`tiles/${innerItem}.png`} x={x} y={y} moveUnit={moveUnit} />
                            );
                        }));
                    })}
                    {units.map((item, x) => {
                        return (item.map((innerItem, y) => {
                            let isSelected = false;
                            if (selectedUnit.x === x && selectedUnit.y === y) {
                                isSelected = true;
                            }
                            if (innerItem !== '') {
                                return (
                                    <Unit unit={innerItem} x={x} y={y} attackUnit={attackUnit} setSelectedUnit={setSelectedUnit} turn={turn} isSelected={isSelected} selectedUnit={selectedUnit} />
                                );
                            } else {
                                return undefined;
                            }
                        }));
                    })}
                </div>
                <div className="details-container">
                    <Details selectedUnit={selectedUnit} setSelectedUnit={setSelectedUnit}/>
                </div>
            </div>
        </div>
    );
}

export default Game;