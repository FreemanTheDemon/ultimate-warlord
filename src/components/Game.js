import React, { useState, useEffect } from 'react';
import './component-styles/game.css'
import Tile from './Tile';
import Unit from './Unit';
import Battle from './Battle';
import Details from './Details';

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
    ['', '', '', '', '', {units: [{id: 3, moving: false}, {id: 5, moving: true}, {id: 4, moving: false}, {id: 4, moving: true}], team: 2, x: 0, y: 5}, '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', {units: [{id: 2, moving: false}], team: 0, x: 3, y: 4}, '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', {units: [{id: 24, moving: false}], team: 1, x: 5, y: 8}, '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '']
];

/*
unit ids:

0 - NAVIES - boat
20+ - HEROES - lord
1 - DRAGONS - dragon_green
2 - WIZARDS - wizard
3 - DEMONS - demon_red
4 - DEVILS - helion
5 - UNDEAD - skeleton_warrior/zombie_a with zombie_b's arm
6 - PEGASI - valkyrie_a
7 - GIANTS - ogre
8 - GRIFFINS - spirit
9 - DWARVES - dwarf
10 - WOLF-RIDERS - wolf_black
11 - CAVALRY - modified templar
12 - HEAVY INFANTRY - knight/paladin
13 - LIGHT INFANTRY - warrior
14 - ELVEN ARCHERS - archer/elf_bowman
15 - SCOUT - thief
*/

// up to 8 units
// let unitsTable = [{bag: ['item1', 'item2'], id: 20}, {bag: ['item3', 'item4'], id: 21}];

// let bags = [[]];

function Game() {
    const [selectedUnit, setSelectedUnit] = useState({id: null}); // {[units: [{id: NUM, moving: BOOL}], team: NUM, x: NUM, y: NUM}
    const [battle, setBattle] = useState(false);
    
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

    function selectUnit(unit) {
        setSelectedUnit(unit);
    }

    function deselectUnit() {
        setSelectedUnit({id: null});
    }

    function moveUnit(x, y) {
        if (selectedUnit.id !== null) {
            // copy the unit - change this to only copy only units with moving === true
            let unit = Object.assign({}, units[selectedUnit.x][selectedUnit.y]);
            // clear the unit - change this to instead delete unmoved unit data in that position
            units[selectedUnit.x][selectedUnit.y] = '';
            // set the new x and y values
            unit.x = x;
            unit.y = y;
            // set the selected unit
            // move the unit to the new position
            setSelectedUnit(unit);
            units[x][y] = unit;
        }
    }

    return (
        <div className="map-container">
            {battle && <Battle attacker={null} defender={null} setBattle={setBattle}/>}
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
                                <Unit unit={innerItem} x={x} y={y} selectUnit={selectUnit} isSelected={isSelected} />
                            );
                        } else {
                            return undefined;
                        }
                    }));
                })}
            </div>
            <div className="details-container">
                <Details />
            </div>
        </div>
    );
}

export default Game;