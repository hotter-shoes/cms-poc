import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import get from 'lodash.get'

function ShopBySize(props){

    const [intent,setIntent] = useState(false);

    const defaultProps = {
        "title": "Default Title",
        "links-left": [{
                "text": "Link 1",
                "url": "#1"
            },
            {
                "text": "Link 2",
                "url": "#2"
            }, {
                "text": "Link 3",
                "url": "#3"
            }
        ],
        "links-right": [{
            "text": "Link 1",
            "url": "#1"
        },
        {
            "text": "Link 2",
            "url": "#2"
        }, {
            "text": "Link 3",
            "url": "#3"
        }
    ]
    }
    const title = get(props,'title',defaultProps.title)
    const leftLinks = get(props,'links-left',defaultProps['links-left'])
    const rightLinks = get(props,'links-right',defaultProps['links-right'])

    const leftLinkList = leftLinks.map((link,index)=><Link key={index} to={link.url} onClick={()=>props.closeMenu()}>{link.text}</Link>)
    const rightLinkList = rightLinks.map((link,index)=><Link key={index} to={link.url} onClick={()=>props.closeMenu()}>{link.text}</Link>)

    const intentClass = intent?"mm-shop-by-size intent":"mm-shop-by-size"

    function handleTouch(){
        if(window.innerWidth<992){
        setIntent(!intent);
        }
    }

    return(<section className={intentClass}>
        <p className="title" onClick={()=>handleTouch()}>{title}</p>
        <div className="links">
        <div className="left">
        {leftLinkList}
        </div>
        <div className="right">
        {rightLinkList}
        </div>
        </div>
   
    </section>
    )
}

export default ShopBySize;