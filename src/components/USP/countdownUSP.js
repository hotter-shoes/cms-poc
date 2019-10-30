import React , {useState,useEffect} from 'react'
import Countdown from './countDown';
import PropTypes from 'prop-types'; // ES6
CountdownUSP.propTypes = {
    endDate:PropTypes.string.isRequired,
    endTime:PropTypes.string.isRequired,
    message:PropTypes.string.isRequired,
    style:PropTypes.object
}

CountdownUSP.defaultProps = {
    endDate:`${new Date().getUTCDate()+1}/${new Date().getUTCMonth()+1}/${new Date().getFullYear()}`,
    endTime:'00:00',
    message:'Countdown USP - No data recieved',
    style:{}
}



function CountdownUSP(props) {
    const promoEndDate = convertUserInputToDate(props.endDate, props.endTime);

    const milliseconds = getMillisecondsLeft(promoEndDate)

    const defaultTimesUp = milliseconds < 0 ? true : false;

    const [timesUp, setTimesUp] = useState(defaultTimesUp); //ensures that if the endDate is in the past, the USP doesnt flicker in and out
    const [timeRemaining, setTimeRemaining] = useState(convertMilliToDHMS(milliseconds)); //setting the default state as the actual state, prevents the time flicekring initally

    useEffect(() => {
        const interval = setInterval(() => {
            const millis = getMillisecondsLeft(promoEndDate)
            if (millis <= 0) {
                clearInterval(interval);
                setTimesUp(true)
            } else {
                setTimeRemaining(convertMilliToDHMS(millis));
            }
        }, 1000)
        //on unmount, remove interval
        return () => {
            clearInterval(interval)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    if(timesUp){
        //dont render if endDate is in past
        return false
    }else{
        return(
        <div id="usp" className="countdown" style={props.style}>
            <section className="message">
                <span className="message">{props.message}</span>
            </section>
            <Countdown {...timeRemaining}/>
        </div>
        )
    }
}

function getMillisecondsLeft(promoEndDate){
    const endTime = promoEndDate.getTime();
    const now = new Date().getTime();
    return endTime - now;
}

function convertUserInputToDate(date, time) {
    const dateRegExp = /(\d{2})[/\\-](\d{2})[\\/-](\d{4}|\d{2})/;
    const timeRegex = /(\d{2}):(\d{2})/;

    const [, day, month, year] = dateRegExp.exec(date) || []
    const [, hours, minutes] = timeRegex.exec(time) || []

    const dateTime = new Date(year, month - 1, day, hours, minutes);

    if (isValidDate(dateTime)) {
        return dateTime
    } else {
        console.error("Invalid Date", date, time);
        return false;
    }
}

function convertMilliToDHMS(milliseconds) {
    const days = Math.floor(milliseconds / (24 * 60 * 60 * 1000))
    milliseconds -= days > 0 ? days * 24 * 60 * 60 * 1000 : 0;

    const hours = Math.floor(milliseconds / (60 * 60 * 1000))
    milliseconds -= hours > 0 ? hours * 60 * 60 * 1000 : 0;

    const minutes = Math.floor(milliseconds / (60 * 1000))
    milliseconds -= minutes > 0 ? minutes * 60 * 1000 : 0;

    const seconds = Math.floor(milliseconds / 1000)

    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
}

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

export default CountdownUSP