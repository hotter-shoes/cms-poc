import React from 'react'
import SimpleUSP from './simpleUSP';
import CountdownUSP from './countdownUSP';

import './usp.css';

function USP(props){
    
    if(typeof props.usp === "undefined"){
        console.error("Incorrect data sent to USP",props);
        return false;
    }

    switch(props.usp['@type']){
        case 'https://header.usp.countdown':
            return <CountdownUSP {...props.usp}/>
        case 'https://header.usp.simple':
            return <SimpleUSP {...props.usp}/>
        default:
            return false;
    }
}

export default USP