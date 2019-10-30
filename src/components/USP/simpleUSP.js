import React from 'react'
import {Link} from 'react-router-dom';

import PropTypes from 'prop-types'; // ES6
SimpleUSP.propTypes = {
    promo:PropTypes.string.isRequired,
    message:PropTypes.string.isRequired,
    links:PropTypes.object.isRequired,
    style:PropTypes.object.isRequired
}


function SimpleUSP(props){
console.log(props)
const message = props.message || {'desktop':"Missing Message - Desktop",'mobile':"Mising Message - Mobile"};
const promo = props.promo || 'Missing Promo'
const links = props.links || {main:"#",terms:'#'};
const style = props.style || {};
    return (<div id="usp" className="simple" style={style}>
        <Link to={links.main}>
            <span className="desktop">{message.desktop}&nbsp;</span>
            <span className="mobile">{message.mobile}&nbsp;</span>
            <span className="use">USE CODE:&nbsp;</span>
            <span className="code">{promo}&nbsp;</span>
        </Link>
        <Link to={links.terms} className="terms">T&Cs</Link>
    </div>)
}

export default SimpleUSP