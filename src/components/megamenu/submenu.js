import React from 'react';
import get from 'lodash.get'
import MegaMenuImage from './image';
import Callout from './callout';
import TitledList from './titledList';
import {Link} from 'react-router-dom';
import ShopBySize from './shopbysize';

function SubMenu(props) {

    const defaultProps = {
        "title": "Sub Menu 1",
        "link":"#",
        "subsections": [            {
                "type": "callout",
                "data": {
                    "links": [{
                            "text": "Link 1",
                            "href": "#1"
                        },
                        {
                            "text": "Link 2",
                            "href": "#2"
                        }, {
                            "text": "Link 3",
                            "href": "#3"
                        }
                    ]
                }
            },
            {
                "type": "titledList",
                "data": {
                    "title": "Default Title",
                    "links": [{
                            "text": "Link 1",
                            "href": "#1"
                        },
                        {
                            "text": "Link 2",
                            "href": "#2"
                        }, {
                            "text": "Link 3",
                            "href": "#3"
                        }
                    ]
                }
            },{
                "type": "image",
                "data": {
                    href: "#image",
                    src: "https://picsum.photos/380/260?grayscale=1&random="+Math.random(),
                    alt: "mm alt"
                }
            }

        ]
    }

    const title = get(props, 'title', defaultProps.title);
    const link =get(props, 'link', defaultProps.link);

    const subsections = get(props, 'subsections', defaultProps.subsections);


    const menu = subsections.map((content,index) => {
        switch (content['@type']) {
            case "https://www.megamenu.subsection.image":
                return <MegaMenuImage key={index} closeMenu={props.closeMenu} {
                    ...content
                }
                />
            case "https://www.megamenu.subsection.callout":
                return <Callout key={index} closeMenu={props.closeMenu} {
                    ...content
                }
                />
            case "https://www.megamenu.subsection.titledlist":
                return <TitledList key={index} closeMenu={props.closeMenu} {
                    ...content
                }
                />
                            case "https://www.megamenu.subsection.shopbysize":
                                return <ShopBySize key={index} closeMenu={props.closeMenu} {
                                    ...content
                                }
                                />
            default:
                console.warn("Mega Menu - Unrecognised menu type", content);
                return false

        }

    })
 
    const intentClass =  props.intent?"sub-menu-container intent":"sub-menu-container"

    return ( 
        <section className={intentClass} >
            <Link className="sub-menu-title" 
            to={link} 
            onMouseEnter={(e)=> props.pointerEvents.enter(e,props.index)}  
            onMouseLeave={(e)=>props.pointerEvents.leave(e,props.index)} 
            onMouseUp={(e)=>props.pointerEvents.click(e,props.index)}
            onTouchEnd={(e)=>props.pointerEvents.tap(e,props.index,link)}
        > {title} </Link> 

            <div className="sub-menu"  onMouseEnter={(e)=> props.pointerEvents.enter(e,props.index)}  
            onMouseLeave={(e)=>props.pointerEvents.leave(e,props.index)} > {menu} </div> 
        </section>
    )
}



export default SubMenu;