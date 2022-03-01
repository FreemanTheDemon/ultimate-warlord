import React, {useEffect, useState} from 'react';

function UnitBattle({unit, destroy}) {
    let unitId = unit.id;
    if (unitId >= 20) {
        unitId = 20;
    }

    const [image, setImage] = useState(`units/${unitId}.gif`);

    let audio = new Audio("/audio/boom.wav")

    useEffect(() => {
        if (destroy !== 0) {
            const timer = setTimeout(() =>{
                audio.play();
                setImage(`other/explosion.gif`);
                setTimeout(() =>{
                    setImage('');
                }, 1000)
            }, (1000 * destroy))
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <>
            <img src={image} alt='' />
        </>
    );
}

export default UnitBattle;