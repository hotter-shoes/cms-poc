import React , {useState,useEffect} from 'react'



function CountdownUSP(props){
    const [timeRemaining, setTimeRemaining] = useState({});
    const endDate = props.endDate || '31/12/2099';
    const endTime = props.endTime || '23:59';
    const style = props.style || {};


    const promoEndDate = getDate(endDate,endTime);


    useEffect(()=>{

        const interval = setInterval(()=>{
            const endTime = promoEndDate.getTime();
            const now = new Date().getTime();

            const timeRemainingMilli = endTime - now;

            setTimeRemaining(millisecondsRemainingToDateRemaining(timeRemainingMilli));
        
        },1000)

        return ()=>{clearInterval(interval)}
        
    },[])


    

    return <div id="usp" className="countdown" style={style}>
         <section className="message">
            <span className="message">{props.message}</span>
         </section>

        <section className="timer">
            {timeRemaining.days > 0 && <div className="day"><span className="digit">{timeRemaining.days}</span><span className="word">{timeRemaining.days!==1?'days':'day'}</span></div> }
            {<div className="hour"><span className="digit">{timeRemaining.hours}</span><span className="word">{timeRemaining.hours!==1?'hours':'hour'}</span></div> }
            {<div className="minute"><span className="digit">{timeRemaining.minutes}</span><span className="word">{timeRemaining.minutes!==1?'minutes':'minute'}</span></div> }
            {<div className="second"><span className="digit">{timeRemaining.seconds}</span><span className="word">{timeRemaining.seconds!==1?'seconds':'second'}</span></div> }
        </section>
        </div>
}

function getDate(date,time){
    const dateRegExp = /(\d{2})[/\\-](\d{2})[\\/-](\d{4}|\d{2})/;
    const timeRegex = /(\d{2}):(\d{2})/;

    const [,day,month,year] = dateRegExp.exec(date) || []
    const [,hours,minutes] = timeRegex.exec(time) || []

    const dateTime = new Date(year,month-1,day,hours,minutes);

    if(isValidDate(dateTime)){
        return dateTime
    }else{
        console.error("Invalid Date",date,time);
        return false;
    }
}

function millisecondsRemainingToDateRemaining(milliseconds){
    const days = Math.floor(milliseconds / (24*60*60*1000))
    milliseconds -= days > 0 ? days * 24*60*60*1000 : 0;

    const hours = Math.floor(milliseconds / (60*60*1000))
    milliseconds -= hours > 0 ? hours * 60*60*1000 : 0;

    const minutes = Math.floor(milliseconds / (60*1000))
    milliseconds -= minutes > 0 ? minutes * 60*1000 : 0;

    const seconds = Math.floor(milliseconds / 1000)

    return {days:days,hours:hours,minutes:minutes,seconds:seconds}

}

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

export default CountdownUSP