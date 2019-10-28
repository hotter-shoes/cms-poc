import React , {useState,useEffect} from 'react'
import Countdown from './countDown';



function CountdownUSP(props) {
    const endDate = props.endDate || '01/01/1970';
    const endTime = props.endTime || '00:00';
    const message = props.message || 'No Message Provided';
    const style = props.style || {};

    const promoEndDate = convertUserInputToDate(endDate, endTime);

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
    }, [])


    if(timesUp){
        //dont render if endDate is in past
        return false
    }else{
        return(
        <div id="usp" className="countdown" style={style}>
            <section className="message">
                <span className="message">{message}</span>
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