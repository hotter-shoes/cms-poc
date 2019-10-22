import React,{useState} from 'react';
import {Link} from 'react-router-dom';

function ShopBySize(props){

    const [intent,setIntent] = useState(false);

    const defaultProps = {
        "title": "Missing Title",
        "links-left": [{
            "text": "Missing Left Links",
            "url": "#"
        }],
        "links-right": [{
            "text": "Missing Right Links",
            "url": "#"
        }]
    }


    const title = props.title || defaultProps.title
    const leftLinks = props['links-left'] || defaultProps['links-left']
    const rightLinks = props['links-right'] || defaultProps['links-right']

    const leftLinkList = leftLinks.map((link,index)=><Link key={index} to={link.url||"#"} onClick={()=>props.closeMenu()}>{link.text||"Missing Link Text"}</Link>)
    const rightLinkList = rightLinks.map((link,index)=><Link key={index} to={link.url||"#"} onClick={()=>props.closeMenu()}>{link.text||"Missing Link Text"}</Link>)

    const intentClass = intent?"mm-shop-by-size intent":"mm-shop-by-size"

    function handleTouch(){
        if(window.innerWidth<992){
        setIntent(!intent);
        }
    }

    return(
        <section className={intentClass}>
            <p className="title" onClick={()=>handleTouch()}>{title}</p>
            <div className="links">
                <div className="left">{leftLinkList}</div>
                <div className="right">{rightLinkList}</div>
            </div>
        </section>
    )
}

export default ShopBySize;