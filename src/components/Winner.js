import React from 'react';
import './component-styles/winner.css';

function Winner({winner}) {
    return (
        <div className="winner-container">
            <h1>CONGRATULATIONS</h1>
            <p>Player {winner} has won the game!</p>
        </div>
    );
}

export default Winner;