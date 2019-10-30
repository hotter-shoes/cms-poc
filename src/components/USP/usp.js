import React from 'react'
import SimpleUSP from './simpleUSP';
import CountdownUSP from './countdownUSP';
import './usp.css';
import PropTypes from 'prop-types';
USP.propTypes = {
    usp:PropTypes.shape({
        '@type':PropTypes.string.isRequired
    }).isRequired
}

USP.defaultProps = {
    usp:{
        '@type':undefined
    }
}

function USP(props){
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