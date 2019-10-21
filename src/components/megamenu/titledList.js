import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import get from 'lodash.get'

function TitledList(props){

    const [intent,setIntent] = useState(false);

    const defaultProps = {
        "title":"Default Title",
        "links":[
            {"text":"Link 1",
        "url":"#1"},
        {"text":"Link 2",
        "url":"#2"},   {"text":"Link 3",
        "url":"#3"}
        ]
    }
    const title = get(props,'title',defaultProps.title)
    const links = get(props,'links',defaultProps.links)

    const linkList = links.map((link,index)=><Link key={index} to={link.url} onClick={()=>props.closeMenu()}>{link.text}</Link>)

    const intentClass = intent?"mm-titled-list intent":"mm-titled-list"

    function handleTouch(){
        if(window.innerWidth<992){
        setIntent(!intent);
        }
    }

    return(<section className={intentClass}>
        <p className="title" onClick={()=>handleTouch()}>{title}</p>
        {linkList}
    </section>
    )
}

export default TitledList;