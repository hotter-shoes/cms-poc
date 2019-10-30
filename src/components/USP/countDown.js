import React from 'react';

import PropTypes from 'prop-types'; // ES6

Countdown.defaultProps = {
    days:0,
    hours:0,
    minutes:0,
    seconds:0
}

Countdown.propTypes = {
    days:PropTypes.number.isRequired,
    hours:PropTypes.number.isRequired,
    minutes:PropTypes.number.isRequired,
    seconds:PropTypes.number.isRequired
}

function Countdown(props){
    return (
        <section className="timer">
            {props.days > 0 && <div className="day"><span className="digit">{props.days}</span><span className="word">{props.days!==1?'days':'day'}</span></div> }
            {<div className="hour"><span className="digit">{props.hours}</span><span className="word">{props.hours!==1?'hours':'hour'}</span></div> }
            {<div className="minute"><span className="digit">{padZero(props.minutes)}</span><span className="word">{props.minutes!==1?'minutes':'minute'}</span></div> }
            {<div className="second"><span className="digit">{padZero(props.seconds)}</span><span className="word">{props.seconds!==1?'seconds':'second'}</span></div> }
        </section>
    )
}

function padZero(number){
    return number.toString().padStart(2,0)
}

export default Countdown;