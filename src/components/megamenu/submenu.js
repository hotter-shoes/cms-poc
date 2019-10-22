import React from 'react';
import MegaMenuImage from './image';
import Callout from './callout';
import TitledList from './titledList';
import {Link} from 'react-router-dom';
import ShopBySize from './shopbysize';

function SubMenu(props) {

    const title = props.title || "Missing Title!";
    const link =props.link || "#";
    const subsections = props.subsections || [];

    const menu = subsections.map((content,index) => {

        /*
        * each @type corresponds to a content type in Amplience, 
        * this will send back different data, thus needing a different presentation
        */

        switch (content['@type']) {
            case "https://www.megamenu.subsection.image":
                return <MegaMenuImage key={index} closeMenu={props.closeMenu} {...content}/>
            case "https://www.megamenu.subsection.callout":
                return <Callout key={index} closeMenu={props.closeMenu} {...content}/>
            case "https://www.megamenu.subsection.titledlist":
                return <TitledList key={index} closeMenu={props.closeMenu} {...content}/>
            case "https://www.megamenu.subsection.shopbysize":
                return <ShopBySize key={index} closeMenu={props.closeMenu} {...content}/>
            default:
                console.warn("Mega Menu - Unrecognised Mega Menu type", content.type, content);
                return false
        }
    })
 
    const intentClass =  props.intent?"sub-menu-container intent":"sub-menu-container"

    return ( 
        <section className={intentClass} >
            <Link 
            className="sub-menu-title" 
            to={link} 
            onMouseEnter={(e)=> props.pointerEvents.enter(e,props.index)}  
            onMouseLeave={(e)=>props.pointerEvents.leave(e,props.index)} 
            onMouseUp={(e)=>props.pointerEvents.click(e,props.index)}
            onTouchEnd={(e)=>props.pointerEvents.tap(e,props.index,link)}> 
                {title} 
            </Link> 
            <div 
            className="sub-menu"  
            onMouseEnter={(e)=> props.pointerEvents.enter(e,props.index)}  
            onMouseLeave={(e)=>props.pointerEvents.leave(e,props.index)}> 
                {menu} 
            </div> 
        </section>
    )
}



export default SubMenu;