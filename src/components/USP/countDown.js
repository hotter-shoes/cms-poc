import React from 'react';

function Countdown(props){

    const days = props.days || 0;
    const hours = props.hours || 0;
    const minutes = props.minutes || 0;
    const seconds = props.seconds || 0;

    return (
        <section className="timer">
            {days > 0 && <div className="day"><span className="digit">{days}</span><span className="word">{days!==1?'days':'day'}</span></div> }
            {<div className="hour"><span className="digit">{hours}</span><span className="word">{hours!==1?'hours':'hour'}</span></div> }
            {<div className="minute"><span className="digit">{padZero(minutes)}</span><span className="word">{minutes!==1?'minutes':'minute'}</span></div> }
            {<div className="second"><span className="digit">{padZero(seconds)}</span><span className="word">{seconds!==1?'seconds':'second'}</span></div> }
        </section>
    )
}

function padZero(number){
    return number.toString().padStart(2,0)
}

export default Countdown;