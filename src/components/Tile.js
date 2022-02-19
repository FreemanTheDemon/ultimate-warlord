import React from 'react';
import './component-styles/tile.css';

function Tile({tile, x, y, moveUnit}) {
    // selected: outline: '2px dashed yellow', outlineOffset: '-2px'
    return (
        <>
            <img onClick={()=>{moveUnit(x, y)}} className="tile" src={tile} alt='tile' style={{top: `calc(${x} * 48px)`, left: `calc(${y} * 48px)`}} />
        </>
    );
}

export default Tile;