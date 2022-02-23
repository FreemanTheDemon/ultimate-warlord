import React, { useState, useEffect } from 'react';
import './component-styles/game.css'
import Tile from './Tile';
import Unit from './Unit';
import Battle from './Battle';
import Details from './Details';
import { unitStats } from '../unit-stats';

let turn = 0;

const grid = [
    ['grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1'],
    ['grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1'],
    ['grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1'],
    ['grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1'],
    ['grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1'],
    ['grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1'],
    ['grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1'],
    ['grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1'],
    ['grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1'],
    ['grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1'],
    ['grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1'],
    ['grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1', 'grass_1']
];


let units = [
    ['', '', '', '', '', {units: [{id: 3, moving: true, movement: 5, unique: 1}, {id: 5, moving: true, movement: 5, unique: 2}, {id: 4, moving: true, movement: 5, unique: 3}, {id: 4, moving: true, movement: 5, unique: 4}], team: 2, x: 0, y: 5}, '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', {units: [{id: 2, moving: true, movement: 5, unique: 5}], team: 0, x: 3, y: 4}, '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', {units: [{id: 24, moving: true, movement: 5, unique: 6}], team: 1, x: 5, y: 8}, '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '']
];

// up to 8 units
// let unitsTable = [{bag: ['item1', 'item2'], id: 20}, {bag: ['item3', 'item4'], id: 21}];

// let bags = [[]];

function Game() {
    const [selectedUnit, setSelectedUnit] = useState({id: null}); // {units: [{id: NUM, moving: BOOL}], team: NUM, x: NUM, y: NUM}
    const [defender, setDefender] = useState({id: null});
    const [battle, setBattle] = useState(false);
    const [defenderWins, setDefenderWins] = useState(true);
    
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
            if (units[x][y] !== '' && units[x][y].team !== selectedUnit.team) {
                console.log('attack');
            }
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
        setBattle(true);

        // no matter what, one unit will be deleted
        // if the attacker wins, move the attacker to the tile that was attacked

        for (let i = 0; i < selectedUnit.units.length; i++) {
            
        }
    }

    useEffect(() => {
        if (battle === false) {
            if (defenderWins) {
                // delete the attacker, clear the defender, clear selected unit
                setDefender({id: null});
                setSelectedUnit({id: null});
            } else {
                // delete the defender, clear the defender
                setDefender({id: null})
            }
        }
    }, [battle]);

    return (
        <div className="map-container">
            {battle && <Battle attacker={selectedUnit} defender={defender} setDefender={setDefender} setSelectedUnit={setSelectedUnit} setBattle={setBattle} />}
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
    );
}

export default Game;