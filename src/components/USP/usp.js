import React from 'react'
import SimpleUSP from './simpleUSP';
import CountdownUSP from './countdownUSP';

import './usp.css';

function USP(props){
    switch(props['@type']){
        case 'https://header.usp.countdown':
            return <CountdownUSP {...props}/>
        case 'https://header.usp.simple':
            return <SimpleUSP {...props}/>
        default:
            return false;
    }
}

export default USP