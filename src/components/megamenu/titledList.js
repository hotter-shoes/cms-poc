import React,{useState} from 'react';
import {Link} from 'react-router-dom';

function TitledList(props){

    const [intent, setIntent] = useState(false);

    const title = props.title || "Missing Title!" 
    const links = props.links || [{url:"#",text:"Missing Link Text!"}]

    const linkList = links.map((link,index)=><Link key={index} to={link.url} onClick={()=>props.closeMenu()}>{link.text}</Link>)

    const intentClass = intent?"mm-titled-list intent":"mm-titled-list"

    function handleTouch(){
        if(window.innerWidth<992){
        setIntent(!intent);
        }
    }

    return(
        <section className={intentClass}>
            <p className="title" onClick={()=>handleTouch()}>{title}</p>
            {linkList}
        </section>
    )
}

export default TitledList;