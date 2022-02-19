import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import Unit from './Unit';
import Battle from './Battle';

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
    ['', '', '', '', '', 'archer_1', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', 'wizard_1', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '']
];

/*
unit ids:
1 - Hero
2 - Dragon
3 - Wizard
4 - Knight
5 - Soldier
6 - Archer
*/

// up to 8 units
let unitObjExample = {units: ['wizard_1', 'archer_1', 'warrior_m_1', 'archer_1', 'archer_1', '', '', '']}

function Game() {
    const [selectedUnit, setSelectedUnit] = useState([null, null]); // [x, y]
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

    function selectUnit(x, y) {
        setSelectedUnit([x, y]);
    }

    function deselectUnit() {
        setSelectedUnit([null, null]);
    }

    function moveUnit(x, y) {
        if (selectedUnit[0] !== null) {
            let unit = units[selectedUnit[0]][selectedUnit[1]];
            units[selectedUnit[0]][selectedUnit[1]] = '';
            setSelectedUnit([x, y]);
            units[x][y] = unit;
        }
    }

    return (
        <div>
            <p>
                This is the Game.
            </p>
            {battle && <Battle />}
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
                        if (selectedUnit[0] === x && selectedUnit[1] === y) {
                            isSelected = true;
                        }
                        return (
                            <Unit unit={`units/${innerItem}.png`} x={x} y={y} selectUnit={selectUnit} isSelected={isSelected} />
                        );
                    }));
                })}
            </div>
        </div>
    );
}

export default Game;